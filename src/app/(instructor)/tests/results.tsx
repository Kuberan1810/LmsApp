import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import InstructorHeader from '@/components/Instructor/header';
import { SearchNormal1, Filter, Sort } from 'iconsax-react-native';
import { Ionicons } from '@expo/vector-icons';
import ReviewModal from './reviewModal';

const MOCK_STUDENTS = [
  {
    sNo: '1',
    id: '10',
    name: 'Kuberan',
    startTime: '10:20 am',
    endTime: '10:21 am',
    status: 'Submitted',
    mark: '85.71',
  }
];



export default function InstructorTestResultsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<typeof MOCK_STUDENTS[0] | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      <InstructorHeader
        title="Test Results"
        subtitle="View and analyze student test performance."
        onBackPress={() => router.back()}
      />

      <ScrollView className="flex-1 px-5 pt-2" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Test Info Section */}
        <View className="flex-row justify-between items-start mb-6 mt-4">
          <View>
            <Text className="text-[20px] font-bold text-[#1E1E2D] mb-1">Test Name: Sample</Text>
            <Text className="text-[13px] font-medium text-[#808080] mb-3">Module Name: Add Module 1</Text>
            <Text className="text-[13px] text-[#4B5563] leading-6">Date: Jul 11, 2026</Text>
            <Text className="text-[13px] text-[#4B5563] leading-6">Duration: 60 mins</Text>
            <Text className="text-[13px] text-[#4B5563] leading-6">Total Submissions: 1</Text>
          </View>
          <TouchableOpacity className="border border-[#E2E8F0] bg-white rounded-xl px-4 py-2">
            <Text className="text-[#333333] font-medium text-[13px]">Edit Test</Text>
          </TouchableOpacity>
        </View>

        {/* Filters Section */}
        <View className="bg-white border border-[#E2E8F0] rounded-[20px] p-4 mb-6 shadow-sm shadow-gray-100/50">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="border border-[#E2E8F0] rounded-[10px] px-3 py-1.5 flex-row items-center">
              <Text className="text-[#333333] text-[13px] mr-1">Passed:</Text>
              <Text className="text-[#2A9A46] font-semibold text-[14px]">1</Text>
            </View>
            <View className="border border-[#E2E8F0] rounded-[10px] px-3 py-1.5 flex-row items-center">
              <Text className="text-[#333333] text-[13px] mr-1">Failed:</Text>
              <Text className="text-[#E7000B] font-semibold text-[14px]">0</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <View className="flex-1 flex-row items-center border border-[#E2E8F0] rounded-xl px-3 h-11 bg-white">
              <SearchNormal1 size={18} color="#A0A0AB" />
              <TextInput
                placeholder="Search by name or ID..."
                placeholderTextColor="#A0A0AB"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 ml-2 font-medium text-[#1E1E2D] text-[14px]"
              />
            </View>
            <TouchableOpacity className="h-11 px-3 border border-[#E2E8F0] bg-white rounded-xl flex-row items-center justify-center">
              <Filter size={16} color="#6B7280" />
              <Text className="text-[#4B5563] font-medium text-[13px] ml-1.5">Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity className="h-11 px-3 border border-[#E2E8F0] bg-white rounded-xl flex-row items-center justify-center">
              <Sort size={16} color="#6B7280" />
              <Text className="text-[#4B5563] font-medium text-[13px] ml-1.5">Sort</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Data Table */}
        <View className="bg-white border border-[#E2E8F0] rounded-[20px] overflow-hidden mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* Header */}
              <View className="flex-row items-center bg-[#FFFAF5]/50 border-b border-[#F2EEF4] px-4 py-3.5 min-w-[750px]">
                <Text className="w-[50px] font-semibold text-[13px] text-[#333333]">S.No</Text>
                <Text className="w-[80px] font-semibold text-[13px] text-[#333333]">Student ID</Text>
                <Text className="w-[120px] font-semibold text-[13px] text-[#333333]">Name</Text>
                <Text className="w-[100px] font-semibold text-[13px] text-[#333333]">Start Time</Text>
                <Text className="w-[100px] font-semibold text-[13px] text-[#333333]">End Time</Text>
                <Text className="w-[100px] font-semibold text-[13px] text-[#333333]">Status</Text>
                <Text className="w-[80px] font-semibold text-[13px] text-[#333333]">Mark</Text>
                <Text className="flex-1 font-semibold text-[13px] text-[#333333] text-center">Action</Text>
              </View>

              {/* Rows */}
              {MOCK_STUDENTS.map((student, index) => (
                <View key={index} className="flex-row items-center px-4 py-4 min-w-[750px] border-b border-[#F2EEF4] bg-white">
                  <Text className="w-[50px] text-[13px] text-[#4B5563]">{student.sNo}</Text>
                  <Text className="w-[80px] text-[13px] text-[#4B5563]">{student.id}</Text>
                  <Text className="w-[120px] font-bold text-[13px] text-[#1E1E2D]">{student.name}</Text>
                  <Text className="w-[100px] text-[12px] text-[#6B7280]">{student.startTime}</Text>
                  <Text className="w-[100px] text-[12px] text-[#6B7280]">{student.endTime}</Text>
                  <View className="w-[100px]">
                    <View className="bg-[#2A9A46]/10 px-2.5 py-1 rounded-full self-start">
                      <Text className="text-[11px] font-semibold text-[#2A9A46]">{student.status}</Text>
                    </View>
                  </View>
                  <Text className="w-[80px] text-[13px] text-[#4B5563]">{student.mark}</Text>
                  <View className="flex-1 flex-row justify-center">
                    <TouchableOpacity
                      onPress={() => setSelectedStudent(student)}
                      className="bg-[#FFF5ED] px-4 py-1.5 rounded-full"
                    >
                      <Text className="text-[12px] font-bold text-[#F67300]">Review</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Performance Review Modal */}
      <ReviewModal
        visible={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        student={selectedStudent}
      />
    </SafeAreaView>
  );
}
