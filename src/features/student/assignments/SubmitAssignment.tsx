import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Assignment } from './AssignmentCard';
import Header from './Header';

interface SubmitAssignmentProps {
  assignment: Assignment;
  onBack: () => void;
  onSuccess: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: 'Uploading' | 'Ready';
  progress: number;
}

export default function SubmitAssignment({ assignment, onBack, onSuccess }: SubmitAssignmentProps) {
  const { title, courseCode, courseName, dateStr, status } = assignment;

  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const uploadingFile = files.find((f) => f.status === 'Uploading');
    if (!uploadingFile) return;

    const interval = setInterval(() => {
      setFiles((prevFiles) =>
        prevFiles.map((file) => {
          if (file.status === 'Uploading') {
            const nextProgress = file.progress + 15;
            if (nextProgress >= 100) {
              return { ...file, progress: 100, status: 'Ready' };
            }
            return { ...file, progress: nextProgress };
          }
          return file;
        })
      );
    }, 800);

    return () => clearInterval(interval);
  }, [files]);

  // Delete file handler
  const handleDeleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Add file
  const handleAddFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const newFileId = Date.now().toString();

        let sizeStr = '0 B';
        if (asset.size) {
          if (asset.size > 1024 * 1024) {
            sizeStr = `${(asset.size / (1024 * 1024)).toFixed(1)}MB`;
          } else {
            sizeStr = `${(asset.size / 1024).toFixed(0)}KB`;
          }
        }

        const newFile: UploadedFile = {
          id: newFileId,
          name: asset.name,
          size: sizeStr,
          status: 'Uploading',
          progress: 0,
        };
        setFiles((prev) => [...prev, newFile]);
      }
    } catch (err) {
      console.log('Error picking document:', err);
    }
  };

  const isAnyFileUploading = files.some((f) => f.status === 'Uploading');
  const hasFiles = files.length > 0;

  const renderIcon = () => {
    if (status === 'Overdue') {
      return (
        <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
          <Ionicons name="warning-outline" size={12} color="#F1351B" />
        </View>
      );
    }
    return (
      <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
        <MaterialCommunityIcons name="calendar-remove-outline" size={10} color="#9CA3AF" />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <Header onBackPress={onBack} showSearchAndNotify />

      {/* Main Content */}
      <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="bg-white border border-[#F2EEF4] p-5 rounded-[15px] mb-5 shadow-xs">
          {/* Assignment  */}
          <Text className="text-[20px] font-semibold text-[#333333] mb-1">
            {title}
          </Text>
          <Text className="text-[12px] text-[#626262] mb-3">
            {courseCode} - {courseName}
          </Text>

          {/* Due Date Row */}
          <View className="flex-row items-center">
            {renderIcon()}
            <Text className={`text-[14px] ml-1.5 ${status === 'Overdue' ? 'text-[#F1351B]' : 'text-[#626262]'}`}>
              {status === 'Overdue' ? 'Missed' : 'Due'} {dateStr}
            </Text>
          </View>
        </View>

        {/* Submit Assignment Card */}
        <View className="mb-5">
          <Text className="text-[20px] font-medium text-[#333333] mb-4">Submit Assignment</Text>

          {/* Upload Area */}
          <TouchableOpacity
            onPress={handleAddFile}
            style={{ borderStyle: 'dashed' }}
            className="border border-[#333333] rounded-[10px] p-6 items-center justify-center mb-5"
          >
            <View
              style={{
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 5,
              }}
              className="w-[70px] h-[70px] rounded-full bg-[#F67300] items-center justify-center mb-3"
            >
              <Ionicons name="cloud-upload" size={30} color="white" />
            </View>
            <Text className="text-[18px] font-medium text-[#333333] mb-1">Upload your files</Text>
            <Text className="text-[13px] text-[#626262] text-center px-4 leading-normal">
              Drag and drop files here or click to select files. Supported formats: pdf, doc, docx, txt. Maximum file size: 10MB
            </Text>
          </TouchableOpacity>

          {/* Files List */}
          {files.length > 0 && (
            <View className="bg-white border border-[#F2EEF4] p-4 rounded-[10px] mb-5 shadow-xs">
              {files.map((file, index, arr) => (
                <View
                  key={file.id}
                  className={`flex-row justify-between items-center relative overflow-hidden pb-3 ${index < arr.length - 1 ? 'mb-[30px]' : ''
                    }`}
                >
                  <View className="flex-row items-center flex-1 pr-4">
                    <View className="w-[44px] h-[44px] bg-[#FEE2E2] rounded-[10px] justify-center items-center">
                      <MaterialCommunityIcons name="file-pdf-box" size={24} color="#EF4444" />
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="text-[16px] font-medium text-[#333333]" numberOfLines={1}>
                        {file.name}
                      </Text>
                      <View className="flex-row items-center mt-0.5">
                        <Text className="text-[12px] text-[#808080] mr-3">{file.size}</Text>
                        {file.status === 'Ready' ? (
                          <Text className="text-[12px] text-[#3EA465] ">Ready to submit</Text>
                        ) : (
                          <Text className="text-[12px] text-gray-400">Uploading...</Text>
                        )}
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleDeleteFile(file.id)}
                    className="p-1"
                  >
                    {file.status === 'Ready' ? (
                      <Ionicons name="trash-outline" size={18} color="#000000" />
                    ) : (
                      <Ionicons name="close" size={18} color="#000000" />
                    )}
                  </TouchableOpacity>

                  {/* Upload Progress Bar */}
                  {file.status === 'Uploading' && (
                    <View className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 rounded-full">
                      <View
                        className="h-full bg-[#F67300] rounded-full"
                        style={{ width: `${file.progress}%` }}
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>


        {/*  Submit Button */}
        <View>
          <TouchableOpacity
            disabled={isAnyFileUploading || !hasFiles}
            onPress={onSuccess}
            className={`w-full py-3 rounded-xl items-center justify-center ${isAnyFileUploading || !hasFiles ? 'bg-[#F67300]/50' : 'bg-[#F67300]'
              }`}
          >
            <Text className="text-white text-[14px] font-medium">
              {isAnyFileUploading ? 'Uploading Files...' : 'Submit Assignment'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
