import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import InstructorHeader from '@/components/Instructor/InstructorHeader';
import { SearchNormal1, Filter, Sort } from 'iconsax-react-native';
import PerformanceReviewModal from '@/components/Instructor/PerformanceReviewModal';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MOCK_STUDENTS = [
  { sNo: '1', id: 'BT010', name: 'Kuberan', startTime: '10:20 am', endTime: '10:21 am', status: 'Submitted', mark: '85.71', passed: true },
  { sNo: '2', id: 'BT011', name: 'Aarav', startTime: '10:25 am', endTime: '10:30 am', status: 'Submitted', mark: '92.00', passed: true },
  { sNo: '3', id: 'BT012', name: 'Rohan', startTime: '10:15 am', endTime: '10:35 am', status: 'Submitted', mark: '45.50', passed: false },
];

export default function InstructorTestResultsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<typeof MOCK_STUDENTS[0] | null>(null);

  const [sortOption, setSortOption] = useState<'Default' | 'Name-ASC' | 'Name-DESC' | 'Mark-HIGH' | 'Mark-LOW'>('Default');
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const [filterOption, setFilterOption] = useState<'All' | 'Passed' | 'Failed'>('All');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Apply search, filter, and sort
  const filteredAndSortedStudents = [...MOCK_STUDENTS]
    .filter(student => {
      // Search
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            student.id.toLowerCase().includes(searchQuery.toLowerCase());
      // Filter
      let matchesFilter = true;
      if (filterOption === 'Passed') matchesFilter = student.passed;
      if (filterOption === 'Failed') matchesFilter = !student.passed;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortOption === 'Name-ASC') return a.name.localeCompare(b.name);
      if (sortOption === 'Name-DESC') return b.name.localeCompare(a.name);
      if (sortOption === 'Mark-HIGH') return parseFloat(b.mark) - parseFloat(a.mark);
      if (sortOption === 'Mark-LOW') return parseFloat(a.mark) - parseFloat(b.mark);
      return 0;
    });

  const passedCount = MOCK_STUDENTS.filter(s => s.passed).length;
  const failedCount = MOCK_STUDENTS.filter(s => !s.passed).length;

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      <InstructorHeader 
        title="Test Results" 
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
            <Text className="text-[13px] text-[#4B5563] leading-6">Total Submissions: {MOCK_STUDENTS.length}</Text>
          </View>
          <TouchableOpacity className="border border-[#E2E8F0] bg-white rounded-xl px-4 py-2">
            <Text className="text-[#333333] font-medium text-[13px]">Edit Test</Text>
          </TouchableOpacity>
        </View>

        {/* Filters Section */}
        <View className="bg-white border border-[#E2E8F0] rounded-[20px] p-4 mb-6 shadow-sm shadow-gray-100/50 relative z-50">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="border border-[#E2E8F0] rounded-[10px] px-3 py-1.5 flex-row items-center bg-[#2A9A46]/5">
              <Text className="text-[#333333] text-[13px] mr-1">Passed:</Text>
              <Text className="text-[#2A9A46] font-semibold text-[14px]">{passedCount}</Text>
            </View>
            <View className="border border-[#E2E8F0] rounded-[10px] px-3 py-1.5 flex-row items-center bg-[#E7000B]/5">
              <Text className="text-[#333333] text-[13px] mr-1">Failed:</Text>
              <Text className="text-[#E7000B] font-semibold text-[14px]">{failedCount}</Text>
            </View>
          </View>
          
          <View className="flex-row items-center gap-2 relative z-50">
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
            
            {/* Filter Dropdown */}
            <View className="relative z-50">
                <TouchableOpacity 
                    onPress={() => {
                        setIsFilterModalOpen(!isFilterModalOpen);
                        setIsSortModalOpen(false);
                    }}
                    className={`h-11 px-3 border border-[#E2E8F0] rounded-xl flex-row items-center justify-center ${isFilterModalOpen ? 'bg-[#FFF5ED]' : 'bg-white'}`}
                >
                    <Filter size={16} color={isFilterModalOpen ? "#F67300" : "#6B7280"} />
                    <Text className={`font-medium text-[13px] ml-1.5 ${isFilterModalOpen ? 'text-[#F67300]' : 'text-[#4B5563]'}`}>Filter</Text>
                </TouchableOpacity>

                {isFilterModalOpen && (
                    <View className="absolute top-12 right-0 w-40 bg-white border border-[#F2EEF4] rounded-[14px] p-1.5 shadow-xl z-50">
                        {['All', 'Passed', 'Failed'].map((opt) => (
                            <TouchableOpacity
                                key={opt}
                                onPress={() => {
                                    setFilterOption(opt as any);
                                    setIsFilterModalOpen(false);
                                }}
                                className={`flex-row items-center justify-between px-3 py-2.5 rounded-[8px] ${filterOption === opt ? 'bg-[#FFF5ED]' : 'active:bg-[#F9FAFB]'}`}
                            >
                                <Text className={`text-[13px] font-medium ${filterOption === opt ? 'text-[#F67300]' : 'text-[#333333]'}`}>
                                    {opt}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            {/* Sort Dropdown */}
            <View className="relative z-50">
                <TouchableOpacity 
                    onPress={() => {
                        setIsSortModalOpen(!isSortModalOpen);
                        setIsFilterModalOpen(false);
                    }}
                    className={`h-11 px-3 border border-[#E2E8F0] rounded-xl flex-row items-center justify-center ${isSortModalOpen ? 'bg-[#FFF5ED]' : 'bg-white'}`}
                >
                    <Sort size={16} color={isSortModalOpen ? "#F67300" : "#6B7280"} />
                    <Text className={`font-medium text-[13px] ml-1.5 ${isSortModalOpen ? 'text-[#F67300]' : 'text-[#4B5563]'}`}>Sort</Text>
                </TouchableOpacity>

                {isSortModalOpen && (
                    <View className="absolute top-12 right-0 w-48 bg-white border border-[#F2EEF4] rounded-[14px] p-1.5 shadow-xl z-50">
                        {[
                            { label: 'Default', value: 'Default' },
                            { label: 'Name (A - Z)', value: 'Name-ASC' },
                            { label: 'Name (Z - A)', value: 'Name-DESC' },
                            { label: 'Marks (High to Low)', value: 'Mark-HIGH' },
                            { label: 'Marks (Low to High)', value: 'Mark-LOW' },
                        ].map((opt) => (
                            <TouchableOpacity
                                key={opt.value}
                                onPress={() => {
                                    setSortOption(opt.value as any);
                                    setIsSortModalOpen(false);
                                }}
                                className={`flex-row items-center justify-between px-3 py-2.5 rounded-[8px] ${sortOption === opt.value ? 'bg-[#FFF5ED]' : 'active:bg-[#F9FAFB]'}`}
                            >
                                <Text className={`text-[13px] font-medium ${sortOption === opt.value ? 'text-[#F67300]' : 'text-[#333333]'}`}>
                                    {opt.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
          </View>
        </View>

        {/* Data Table */}
        <View className="bg-white border border-[#E2E8F0] rounded-[20px] overflow-hidden mb-6 z-10">
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
              {filteredAndSortedStudents.map((student, index) => (
                <TouchableOpacity 
                    key={student.id}
                    onPress={() => setSelectedStudent(student)}
                    activeOpacity={0.7}
                    className="flex-row items-center px-4 py-4 min-w-[750px] border-b border-[#F2EEF4] bg-white"
                >
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
                  <Text className={`w-[80px] font-semibold text-[13px] ${student.passed ? 'text-[#2A9A46]' : 'text-[#E7000B]'}`}>
                      {student.mark}
                  </Text>
                  <View className="flex-1 flex-row justify-center">
                    <View className="bg-[#FFF5ED] px-4 py-1.5 rounded-full">
                      <Text className="text-[12px] font-bold text-[#F67300]">Review</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}

              {filteredAndSortedStudents.length === 0 && (
                <View className="py-10 items-center justify-center min-w-[750px]">
                    <Text className="text-[#8C8E90] text-[14px] font-medium">No students found matching filters.</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      <PerformanceReviewModal
        visible={!!selectedStudent}
        student={selectedStudent ? { name: selectedStudent.name, id: selectedStudent.id } : null}
        onClose={() => setSelectedStudent(null)}
      />
    </SafeAreaView>
  );
}
