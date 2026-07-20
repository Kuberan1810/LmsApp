import { Stack, router } from 'expo-router';
import { ArrowLeft2, ClipboardText } from 'iconsax-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomDropdown from '@/components/Instructor/CustomDropdown';

export default function CreateAssignmentScreen() {
  const [courseName, setCourseName] = useState('');
  const [batchId, setBatchId] = useState('');
  const [moduleName, setModuleName] = useState('');

  const DUMMY_COURSES = [
    { label: 'Am101 - Math', value: 'Am101' },
    { label: 'Ph202 - Physics', value: 'Ph202' },
  ];

  const DUMMY_BATCHES = [
    { label: 'Batch-01', value: 'Batch-01' },
    { label: 'Batch-02', value: 'Batch-02' },
  ];

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Orange Header Section */}
      <View
        className="bg-[#F67300] pt-16 pb-5 px-5 items-center"
        style={{
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 8,
          gap: 20
        }}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-16 left-6 z-10 w-10 h-10 items-center justify-center"
        >
          <ArrowLeft2 size={24} color="#FFFFFF" variant="Outline" />
        </TouchableOpacity>

        {/* Icon & Title */}
        <View className="items-center mt-4">
          <View className="w-[60px] h-[60px] bg-white/20 rounded-[20px] items-center justify-center mb-4">
            <ClipboardText size={32} color="#FFFFFF" variant="Outline" />
          </View>

          <Text className="text-white text-[22px] font-bold">Create Assignment</Text>
          <Text className="text-white text-sm">Assign tasks and track student progress.</Text>
        </View>
      </View>

      {/* Form Section */}
      <ScrollView className="flex-1 px-6 pt-8" showsVerticalScrollIndicator={false}>
        <Text className="text-xl font-bold text-[#1F2937] mb-6">Assignment Details</Text>

        <View className="mb-5">
          <Text className="text-sm font-medium text-[#4B5563] mb-2">Course Name / ID</Text>
          <CustomDropdown 
            value={courseName}
            onChange={setCourseName}
            options={DUMMY_COURSES}
            placeholder="E.g Am101"
          />
        </View>

        <View className="mb-5">
          <Text className="text-sm font-medium text-[#4B5563] mb-2">Batch ID</Text>
          <CustomDropdown 
            value={batchId}
            onChange={setBatchId}
            options={DUMMY_BATCHES}
            placeholder="E.g. Batch-01"
          />
        </View>

        <View className="mb-8">
          <Text className="text-sm font-medium text-[#4B5563] mb-2">Module</Text>
          <TextInput
            value={moduleName}
            onChangeText={setModuleName}
            placeholder="E.g. Module 1"
            placeholderTextColor="#D1D5DB"
            className="bg-[#FAFAFA] border border-[#F3F4F6] rounded-xl px-4 py-3.5 text-base text-[#1F2937]"
          />
        </View>

        {/* Buttons */}
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 py-4 rounded-xl border border-[#E5E7EB] bg-white items-center justify-center mr-3"
          >
            <Text className="text-[#374151] font-semibold text-base">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(instructor)/assignment-details')}
            className="flex-1 py-4 rounded-xl bg-[#F67300] items-center justify-center ml-3"
          >
            <Text className="text-white font-semibold text-base">Next</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
