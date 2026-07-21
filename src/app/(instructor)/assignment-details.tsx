import * as DocumentPicker from 'expo-document-picker';
import { Stack, router } from 'expo-router';
import { ArrowLeft2 } from 'iconsax-react-native';
import { Calendar, Clock, Edit2, FileText, Link2, Trash2, UploadCloud, X, Check } from 'lucide-react-native';
import { useState } from 'react';
import { Animated, ScrollView, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';

export default function AssignmentDetailsScreen() {
  type UploadFile = {
    id: string;
    name: string;
    size: string;
    progress: Animated.Value;
    status: 'uploading' | 'ready';
  };
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [assignmentName, setAssignmentName] = useState('Assignment Name');
  const [description, setDescription] = useState('');
  const [objective, setObjective] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const fileSizeMB = (file.size ? file.size / (1024 * 1024) : 0).toFixed(1) + 'MB';

        const newFile: UploadFile = {
          id: Math.random().toString(),
          name: file.name,
          size: fileSizeMB,
          progress: new Animated.Value(0),
          status: 'uploading',
        };

        setFiles(prev => [...prev, newFile]);

        Animated.timing(newFile.progress, {
          toValue: 100,
          duration: 3000,
          useNativeDriver: false,
        }).start(() => {
          setFiles(prev => prev.map(f => f.id === newFile.id ? { ...f, status: 'ready' } : f));
        });
      }
    } catch (err) {
      console.log('Error picking document', err);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };
  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="pt-16 pb-4 px-5 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-2 p-1">
          <ArrowLeft2 size={24} color="#111827" />
        </TouchableOpacity>

        <View className="flex-row items-center flex-1 pr-4">
          <TextInput
            value={assignmentName}
            onChangeText={setAssignmentName}
            className="text-xl font-medium text-[#111827] mr-2 p-0"
            placeholder="Assignment Name"
            placeholderTextColor="#9CA3AF"
          />
          <Edit2 size={14} color="#9CA3AF" />
        </View>

        <View className="ml-4 bg-[#FFEDD5] px-3 py-1 rounded-full">
          <Text className="text-[#F97316] text-xs font-medium">Batch 02</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>

        {/* Date & Time Row */}
        <View className="flex-row justify-between mb-8 mt-2">
          {/* Due Date */}
          <View className="bg-white rounded-2xl p-4 flex-1 mr-3 flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-medium text-[#4B5563] mb-1">Due date</Text>
              <Text className="text-[#9CA3AF] text-sm">12/01/2026</Text>
            </View>
            <Calendar size={20} color="#9CA3AF" strokeWidth={1.5} />
          </View>

          {/* Due Time */}
          <View className="bg-white rounded-2xl p-4 flex-1 ml-3 flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-medium text-[#4B5563] mb-1">Due Time(IST)</Text>
              <Text className="text-[#9CA3AF] text-sm">11:59 pm</Text>
            </View>
            <Clock size={20} color="#9CA3AF" strokeWidth={1.5} />
          </View>
        </View>

        {/* Description Card */}
        <View className="bg-white rounded-[24px] p-5 mb-5">
          <Text className="text-[18px] text-[#1F2937] mb-4">Description:</Text>
          <View className="border border-[#E5E7EB] rounded-2xl p-4 min-h-[120px]">
            <TextInput
              multiline
              textAlignVertical="top"
              placeholder="Enter description here..."
              placeholderTextColor="#9CA3AF"
              className="text-[#4B5563] text-[14px] leading-5 flex-1"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        {/* Objective Card */}
        <View className="bg-white rounded-[24px] p-5 mb-5">
          <Text className="text-[18px] text-[#1F2937] mb-4">Objective:</Text>
          <View className="border border-[#E5E7EB] rounded-2xl p-4 min-h-[120px]">
            <TextInput
              multiline
              textAlignVertical="top"
              placeholder="Enter objective here..."
              placeholderTextColor="#9CA3AF"
              className="text-[#4B5563] text-[14px] leading-5 flex-1"
              value={objective}
              onChangeText={setObjective}
            />
          </View>
        </View>

        {/* Expected Outcome Card */}
        <View className="bg-white rounded-[24px] p-5 mb-8">
          <Text className="text-[18px] text-[#1F2937] mb-4">Expected Outcome:</Text>
          <View className="border border-[#E5E7EB] rounded-2xl p-4 min-h-[120px]">
            <TextInput
              multiline
              textAlignVertical="top"
              placeholder="Enter expected outcome here..."
              placeholderTextColor="#9CA3AF"
              className="text-[#4B5563] text-[14px] leading-5 flex-1"
              value={expectedOutcome}
              onChangeText={setExpectedOutcome}
            />
          </View>
        </View>

        {/* Resources Card */}
        <View className="bg-white rounded-[24px] p-5 mb-5">
          <Text className="text-[18px] text-[#1F2937] mb-4">Resources</Text>

          <TouchableOpacity onPress={pickDocument} className="border-2 border-dashed border-[#E5E7EB] rounded-2xl py-8 items-center justify-center mb-6">
            <View className="w-14 h-14 bg-[#F67300] rounded-full items-center justify-center mb-4">
              <UploadCloud size={24} color="#FFFFFF" strokeWidth={2} />
            </View>
            <Text className="text-base text-[#1F2937] font-medium mb-2">Upload your files</Text>
            <Text className="text-xs text-[#9CA3AF]">Drag and drop files here or click to select files</Text>
            <Text className="text-xs text-[#9CA3AF] mt-1">Supported formats: pdf, doc, docx, txt</Text>
            <Text className="text-xs text-[#9CA3AF] mt-1">Maximum file size: 10MB</Text>
          </TouchableOpacity>

          {/* Uploaded Files */}
          <View className="mb-4">
            {files.map(file => (
              <View key={file.id} className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-[#FEE2E2] rounded-xl items-center justify-center mr-3">
                    <FileText size={20} color="#DC2626" />
                  </View>
                  <View className="flex-1 mr-4">
                    <Text className="text-sm text-[#1F2937] font-medium" numberOfLines={1}>{file.name}</Text>
                    <View className="flex-row items-center mt-1">
                      <Text className="text-[10px] text-[#9CA3AF] mr-2">{file.size}</Text>
                      <Text className={`text-[10px] ${file.status === 'ready' ? 'text-[#22C55E]' : 'text-[#6B7280]'}`}>
                        {file.status === 'ready' ? 'Ready to submit' : 'Uploading...'}
                      </Text>
                    </View>
                    {file.status === 'uploading' && (
                      <View className="h-1 bg-[#F3F4F6] rounded-full mt-2 overflow-hidden w-full">
                        <Animated.View
                          className="h-full bg-[#F67300] rounded-full"
                          style={{
                            width: file.progress.interpolate({
                              inputRange: [0, 100],
                              outputRange: ['0%', '100%']
                            })
                          }}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeFile(file.id)}>
                  {file.status === 'ready' ? (
                    <Trash2 size={16} color="#9CA3AF" />
                  ) : (
                    <X size={16} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Add Comment Card */}
        <View className="bg-white rounded-[24px] p-5 mb-8">
          <Text className="text-[18px] text-[#1F2937] mb-4">Add Comment:</Text>
          <View className="border border-[#E5E7EB] rounded-2xl p-4 flex-row items-start min-h-[100px]">
            <TextInput
              multiline
              textAlignVertical="top"
              placeholder="Add Comments..."
              placeholderTextColor="#9CA3AF"
              className="text-[#4B5563] text-[14px] leading-5 flex-1 mr-2"
            />
            <View className="flex-row mt-1">
              <TouchableOpacity className="mr-3">
                <Link2 size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row items-center justify-end mb-10">
          <TouchableOpacity 
            className="bg-[#F67300] py-3.5 px-8 rounded-xl items-center justify-center"
            onPress={() => setShowSuccessModal(true)}
          >
            <Text className="text-white font-semibold text-sm">Save & Upload</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
      >
        <View className="flex-1 items-center justify-center px-10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <View className="bg-white rounded-[32px] p-8 w-full items-center">
            <View className="w-14 h-14 bg-[#22C55E] rounded-full items-center justify-center mb-6">
              <Check size={32} color="#FFFFFF" strokeWidth={3} />
            </View>
            <Text className="text-[20px] font-medium text-[#374151] mb-8 text-center">
              Assignment Created !
            </Text>
            <TouchableOpacity 
              className="bg-[#F67300] w-[140px] py-3.5 rounded-xl items-center justify-center"
              onPress={() => {
                setShowSuccessModal(false);
                router.back();
              }}
            >
              <Text className="text-white font-semibold text-[15px]">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
