import { Stack, router } from 'expo-router';
import { ArrowLeft2 } from 'iconsax-react-native';
import { Folder, Upload, Download, Edit2, Trash2, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import CustomDropdown from '../../components/Instructor/CustomDropdown';

export default function CreateResourceScreen() {
  const [courseName, setCourseName] = useState('');
  const [batchId, setBatchId] = useState('');

  const DUMMY_COURSES = [
    { label: 'Aa', value: 'Aa' },
    { label: 'Bb', value: 'Bb' },
  ];
  const DUMMY_BATCHES = [
    { label: 'Batch-B', value: 'Batch-B' },
  ];

  return (
    <View className="flex-1 bg-[#FFFFFF]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Orange Header Section */}
      <View
        className="bg-[#F67300] pt-16 pb-6 px-5 items-center"
        style={{
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 8,
          gap: 16
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-16 left-6 z-10 w-10 h-10 items-center justify-center"
        >
          <ArrowLeft2 size={24} color="#FFFFFF" variant="Outline" />
        </TouchableOpacity>

        <View className="items-center mt-4">
          <View className="w-[60px] h-[60px] bg-white/20 rounded-[20px] items-center justify-center mb-4">
            <Folder size={32} color="#FFFFFF" strokeWidth={1.5} />
          </View>
          <Text className="text-white text-[22px] font-bold">Resource Details</Text>
          <Text className="text-white text-sm text-center px-4 mt-2">Configure target courses, batches, and input materials to share with students.</Text>
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-6 pt-8" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        
        {/* Dropdowns */}
        <View className="mb-5 z-50">
          <Text className="text-sm font-medium text-[#4B5563] mb-2">Course</Text>
          <CustomDropdown 
            value={courseName}
            onChange={setCourseName}
            options={DUMMY_COURSES}
            placeholder="Aa"
          />
        </View>

        <View className="mb-8 z-40">
          <Text className="text-sm font-medium text-[#4B5563] mb-2">Batch</Text>
          <CustomDropdown 
            value={batchId}
            onChange={setBatchId}
            options={DUMMY_BATCHES}
            placeholder="Batch-B"
          />
        </View>

        {/* Upload Files */}
        <View className="mb-8">
          <Text className="text-sm font-medium text-[#4B5563] mb-3">Upload Files</Text>
          <View className="border-[1.5px] border-dashed border-[#D1D5DB] rounded-3xl p-8 items-center bg-white">
            <View className="w-14 h-14 bg-[#F67300] rounded-full items-center justify-center mb-4">
              <Upload size={24} color="#FFFFFF" />
            </View>
            <Text className="text-[#1F2937] font-medium text-base mb-2">Upload your files</Text>
            <Text className="text-[#6B7280] text-sm text-center mb-2">Drag and drop files here or click to select files</Text>
            <Text className="text-[#6B7280] text-xs text-center mb-4">Supported formats: pdf, doc, docx, xls, xlsx, images</Text>
            <Text className="text-[#9CA3AF] text-xs italic">Maximum file size: 10MB</Text>
          </View>
        </View>

        {/* Existing Resources */}
        <View className="mb-8">
          <Text className="text-sm font-medium text-[#4B5563] mb-4">Existing Resources</Text>
          <View className="border border-[#F3F4F6] rounded-2xl p-4">
            <View className="flex-row items-center">
              <View className="w-16 h-13 p-4 rounded-[20px] bg-[#FFF0F0] items-center justify-center mr-3">
                <Image
                    source={require('../../../assets/images/pdficon.svg')}
                    contentFit="contain"
                    style={{ width: 24, height: 24 }}
                />
              </View>
              <View className="flex-1">
                <Text className="text-[#1F2937] font-medium text-sm mb-1" numberOfLines={1}>Text_to_PDF_Onlinenotepad.pdf</Text>
                <Text className="text-[#9CA3AF] text-xs">85.77 KB · 7/14/2026</Text>
              </View>
            </View>
            <View className="flex-row justify-end mt-2 gap-4">
              <TouchableOpacity><Download size={18} color="#9CA3AF" /></TouchableOpacity>
              <TouchableOpacity><Edit2 size={18} color="#9CA3AF" /></TouchableOpacity>
              <TouchableOpacity><Trash2 size={18} color="#EF4444" /></TouchableOpacity>
            </View>
          </View>
        </View>

        {/* FAQ for Students */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-sm font-medium text-[#4B5563]">Frequently Asked Questions (FAQ) for Students</Text>
            <TouchableOpacity className="flex-row items-center">
              <Plus size={16} color="#F67300" />
              <Text className="text-[#F67300] font-medium text-sm ml-1">Add FAQ</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-[#FAFAFA] border border-[#F3F4F6] rounded-2xl p-4">
            <Text className="text-[#9CA3AF] text-xs font-medium mb-3">FAQ #1</Text>
            
            <TextInput
              placeholder="Enter Question (e.g. When is the assignment due?)"
              placeholderTextColor="#9CA3AF"
              className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 text-sm text-[#1F2937] mb-3"
            />
            <TextInput
              placeholder="Enter Answer (e.g. Submissions are accepted until Friday midnight.)"
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 text-sm text-[#1F2937] min-h-[80px]"
            />
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row items-center justify-between mb-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 py-4 rounded-xl border border-[#E5E7EB] bg-white items-center justify-center mr-3"
          >
            <Text className="text-[#374151] font-semibold text-base">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 py-4 rounded-xl bg-[#F67300] items-center justify-center ml-3"
          >
            <Text className="text-white font-semibold text-base">Upload & Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
