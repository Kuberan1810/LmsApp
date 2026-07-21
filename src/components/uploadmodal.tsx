import * as DocumentPicker from 'expo-document-picker';
import { Image as ExpoImage } from 'expo-image';
import { CloseCircle, DocumentUpload, Trash } from 'iconsax-react-native';
import { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

declare const require: any;

/* ---------------- FILE TYPE CONFIG ---------------- */
export type FileConfig = {
  icon: any;
  bg: string;
};

const FILE_TYPE_CONFIG: Record<string, FileConfig> = {
  pdf: { icon: require('../../assets/icon/pdfIcon.svg'), bg: 'bg-[#FEE2E2]' },
  doc: { icon: require('../../assets/icon/docIcon.svg'), bg: 'bg-[#DDEBFD]' },
  docx: { icon: require('../../assets/icon/word.svg'), bg: 'bg-[#DDEBFD]' },
  xls: { icon: require('../../assets/icon/xl.svg'), bg: 'bg-[#CFFFE7]' },
  xlsx: { icon: require('../../assets/icon/xl.svg'), bg: 'bg-[#CFFFE7]' },
  jpg: { icon: require('../../assets/icon/imgIcon.svg'), bg: 'bg-[#B2D2FA]' },
  jpeg: { icon: require('../../assets/icon/imgIcon.svg'), bg: 'bg-[#B2D2FA]' },
  png: { icon: require('../../assets/icon/imgIcon.svg'), bg: 'bg-[#B2D2FA]' },
  gif: { icon: require('../../assets/icon/imgIcon.svg'), bg: 'bg-[#B2D2FA]' },
  webp: { icon: require('../../assets/icon/imgIcon.svg'), bg: 'bg-[#B2D2FA]' },
};

export const getFileConfig = (fileName: string): FileConfig => {
  if (!fileName) return { icon: require('../../assets/icon/file.svg'), bg: 'bg-[#FFF5D5]' };
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  return FILE_TYPE_CONFIG[ext] || { icon: require('../../assets/icon/file.svg'), bg: 'bg-[#FFF5D5]' };
};

/* ---------------- TYPES ---------------- */
export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: 'idle' | 'Uploading' | 'Completed' | 'Failed' | 'Ready';
  progress: number;
  uri?: string;
  file?: any;
}

export interface UploadModalProps {
  files?: UploadedFile[];
  onFilesChange?: (files: UploadedFile[]) => void;
  maxSizeMB?: number;
  allowedTypes?: string[];
  isModal?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
}

export default function UploadModal({
  files: externalFiles,
  onFilesChange,
  maxSizeMB = 10,
  allowedTypes,
  isModal = false,
  isVisible = true,
  onClose,
  title = 'Upload your files',
  subtitle = 'Drag and drop files here or click to select files. Supported formats: pdf, doc, docx, xls, xlsx, images. Maximum file size: 10MB',
}: UploadModalProps) {
  const [internalFiles, setInternalFiles] = useState<UploadedFile[]>([]);
  const files = externalFiles !== undefined ? externalFiles : internalFiles;

  const updateFiles = (newFiles: UploadedFile[] | ((prev: UploadedFile[]) => UploadedFile[])) => {
    if (typeof newFiles === 'function') {
      const updated = newFiles(files);
      if (externalFiles === undefined) setInternalFiles(updated);
      onFilesChange?.(updated);
    } else {
      if (externalFiles === undefined) setInternalFiles(newFiles);
      onFilesChange?.(newFiles);
    }
  };

  /* ---------------- SIMULATE UPLOADING PROGRESS ---------------- */
  useEffect(() => {
    const uploadingFile = files.find((f) => f.status === 'Uploading');
    if (!uploadingFile) return;

    const interval = setInterval(() => {
      updateFiles((prevFiles) =>
        prevFiles.map((file) => {
          if (file.status === 'Uploading') {
            const nextProgress = file.progress + 20;
            if (nextProgress >= 100) {
              return { ...file, progress: 100, status: 'Ready' };
            }
            return { ...file, progress: nextProgress };
          }
          return file;
        })
      );
    }, 400);

    return () => clearInterval(interval);
  }, [files]);

  /* ---------------- FILE SELECTION ---------------- */
  const handleAddFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: allowedTypes || ['*/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        if (asset.size && asset.size > maxSizeMB * 1024 * 1024) {
          alert(`File exceeds ${maxSizeMB}MB limit.`);
          return;
        }

        let sizeStr = '0 B';
        if (asset.size) {
          if (asset.size > 1024 * 1024) {
            sizeStr = `${(asset.size / (1024 * 1024)).toFixed(1)} MB`;
          } else {
            sizeStr = `${(asset.size / 1024).toFixed(0)} KB`;
          }
        }

        const newFileId = Date.now().toString() + Math.random().toString(36).substring(2, 7);
        const newFile: UploadedFile = {
          id: newFileId,
          name: asset.name,
          size: sizeStr,
          status: 'Uploading',
          progress: 0,
          uri: asset.uri,
          file: asset,
        };

        updateFiles((prev) => [...prev, newFile]);
      }
    } catch (err) {
      console.log('Error picking document:', err);
    }
  };

  const removeFile = (id: string) => {
    updateFiles((prev) => prev.filter((f) => f.id !== id));
  };

  /* ---------------- RENDER FILE PREVIEW LIST ---------------- */
  const renderPreviewList = () => {
    if (files.length === 0) return null;

    return (
      <View className="mt-4 space-y-3">
        {files.map((fileObj) => {
          const fileConfig = getFileConfig(fileObj.name);
          return (
            <View
              key={fileObj.id}
              className="flex-row items-center justify-between py-1.5 pr-4 pl-1.5 border border-[#F2EEF4] rounded-[20px] bg-white gap-3 my-1"
            >
              <View className="flex-row items-center gap-3 flex-1">
                <View className={`w-[60px] h-[55px] md:w-[76px] md:h-[69px] rounded-[16px] md:rounded-[20px] justify-center items-center ${fileConfig.bg}`}>
                  <ExpoImage
                    source={fileConfig.icon}
                    style={{ width: 26, height: 28 }}
                    contentFit="contain"
                  />
                </View>

                <View className="flex-1 pr-1">
                  <Text className="text-[14px] md:text-[18px] font-medium text-[#4D4D4D]" numberOfLines={1}>
                    {fileObj.name}
                  </Text>
                  <View className="flex-row items-center gap-3 mt-1 flex-wrap">
                    <Text className="text-[12px] md:text-[14px] text-[#808080]">
                      {fileObj.size}
                    </Text>
                    {fileObj.status === 'Uploading' && (
                      <View className="flex-1 max-w-[120px]">
                        <Text className="text-[10px] text-gray-400 mb-0.5">Uploading...</Text>
                        <View className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <View
                            className="h-full bg-[#F67300] rounded-full"
                            style={{ width: `${fileObj.progress}%` }}
                          />
                        </View>
                      </View>
                    )}
                    {fileObj.status === 'Completed' && (
                      <Text className="text-[12px] md:text-[14px] text-[#3EA465] font-medium">Submitted</Text>
                    )}
                    {fileObj.status === 'Ready' && (
                      <Text className="text-[12px] md:text-[14px] text-[#3EA465] font-medium">Ready to submit</Text>
                    )}
                    {fileObj.status === 'Failed' && (
                      <Text className="text-[12px] md:text-[14px] text-red-500 font-medium">Failed</Text>
                    )}
                    {fileObj.status === 'idle' && (
                      <Text className="text-[12px] md:text-[14px] text-gray-400">Ready</Text>
                    )}
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row items-center">
                {fileObj.status !== 'Uploading' && fileObj.status !== 'Completed' && (
                  <TouchableOpacity onPress={() => removeFile(fileObj.id)} className="p-2">
                    <Trash size={20} color="#626262" />
                  </TouchableOpacity>
                )}
                {fileObj.status === 'Uploading' && (
                  <TouchableOpacity disabled className="p-2 opacity-50">
                    <CloseCircle size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  /* ---------------- UPLOAD DROP AREA ---------------- */
  const renderUploadBox = () => (
    <View>
      <TouchableOpacity
        onPress={handleAddFile}
        style={{ borderStyle: 'dashed' }}
        className="border-2 border-dashed border-[#E5E7EB] rounded-2xl py-8 px-6 items-center justify-center bg-white mb-2"
        activeOpacity={0.8}
      >
        <View className="w-14 h-14 bg-[#F67300] rounded-full items-center justify-center mb-3">
          <DocumentUpload size={24} color="white" variant="Linear" />
        </View>
        <Text className="text-base text-[#1F2937] font-medium mb-1.5 text-center">{title}</Text>
        <Text className="text-xs text-[#9CA3AF] text-center mb-0.5">
          Drag and drop files here or click to select files
        </Text>
        <Text className="text-xs text-[#9CA3AF] text-center mb-0.5">
          Supported formats: pdf, doc, docx, xls, xlsx, images
        </Text>
        <Text className="text-xs text-[#9CA3AF] text-center">
          Maximum file size: {maxSizeMB}MB
        </Text>
      </TouchableOpacity>

      {/* File Preview Section */}
      {renderPreviewList()}
    </View>
  );

  /* ---------------- MODAL WRAPPER ---------------- */
  if (isModal) {
    return (
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <View className="bg-white rounded-[24px] p-6 w-full max-w-lg shadow-xl">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[20px] font-semibold text-[#333333]">{title}</Text>
              {onClose && (
                <TouchableOpacity onPress={onClose} className="p-1">
                  <CloseCircle size={24} color="#626262" />
                </TouchableOpacity>
              )}
            </View>
            <ScrollView style={{ maxHeight: 450 }} showsVerticalScrollIndicator={false}>
              {renderUploadBox()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  return renderUploadBox();
}
