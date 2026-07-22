import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import InstructorHeader from '@/components/Instructor/header';
import { SearchNormal1, Filter, Sort, CloseCircle, TickCircle, MinusCirlce } from 'iconsax-react-native';
import { Ionicons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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

const MOCK_REVIEW = {
  studentName: 'Kuberan',
  studentId: '10',
  status: 'Submitted',
  date: 'July 11, 2026',
  time: '10:21 AM',
  points: 12,
  questions: [
    { id: 1, text: "What does HTML stand for?", status: "INCORRECT", studentAnswer: "Home Text Markup Language", correctAnswer: "Hyper Text Markup Language" },
    { id: 2, text: "Which HTML tag is used to create a hyperlink?", status: "CORRECT", studentAnswer: "<a href>" },
    { id: 3, text: "Which CSS property changes the text color?", status: "CORRECT", studentAnswer: "color" },
    { id: 4, text: "Which selector selects an element by its ID?", status: "CORRECT", studentAnswer: "#container" },
    { id: 5, text: "Which property controls the spacing inside an element?", status: "CORRECT", studentAnswer: "padding" },
    { id: 6, text: "Is HTML a programming language?", status: "CORRECT", studentAnswer: "False" },
    { id: 7, text: "Is CSS used for styling web pages?", status: "CORRECT", studentAnswer: "True" },
    { id: 8, text: "Should every HTML page contain a <body> tag?", status: "CORRECT", studentAnswer: "True" },
    { id: 9, text: "Does the <img> tag require a source attribute?", status: "CORRECT", studentAnswer: "True" },
  ]
};

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
      <Modal
        visible={!!selectedStudent}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedStudent(null)}
      >
        <View className="flex-1 bg-black/40 justify-end">
          <TouchableOpacity
            className="absolute inset-0"
            activeOpacity={1}
            onPress={() => setSelectedStudent(null)}
          />
          <View
            className="bg-white rounded-t-[24px] w-full"
            style={{ maxHeight: SCREEN_HEIGHT * 0.9 }}
          >
            {/* Modal Header */}
            <View className="flex-row items-center justify-between px-6 py-5 border-b border-[#E2E8F0] bg-white rounded-t-[24px]">
              <View className="flex-row items-center">
                <Text className="text-[18px] font-bold text-[#1E1E2D] mr-3">Performance Review</Text>
                <View className="bg-[#2A9A46]/10 px-2 py-1 rounded-full">
                  <Text className="text-[10px] font-bold text-[#2A9A46] uppercase tracking-wider">Submitted</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setSelectedStudent(null)} className="p-1">
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView className="px-5 pt-4 pb-10" showsVerticalScrollIndicator={false}>
              {/* Student Profile Card */}
              <View className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 mb-6">
                <Text className="text-[18px] font-bold text-[#1E1E2D] mb-1">{MOCK_REVIEW.studentName}</Text>
                <View className="flex-row items-center mb-4">
                  <Text className="text-[12px] text-[#6B7280]">ID: <Text className="font-bold text-[#F67300]">{MOCK_REVIEW.studentId}</Text></Text>
                  <View className="w-1 h-1 bg-[#D1D5DB] rounded-full mx-2" />
                  <Text className="text-[12px] font-medium text-[#4B5563]">{MOCK_REVIEW.status}</Text>
                  <View className="w-1 h-1 bg-[#D1D5DB] rounded-full mx-2" />
                  <Text className="text-[12px] text-[#808080]">{MOCK_REVIEW.date} · {MOCK_REVIEW.time}</Text>
                </View>

                <View className="bg-white border border-[#F2EEF4] rounded-[16px] py-4 items-center">
                  <Text className="text-[28px] font-black text-[#F67300]">{MOCK_REVIEW.points}</Text>
                  <Text className="text-[11px] font-black text-[#6B7280] uppercase tracking-widest mt-1">Points</Text>
                </View>
              </View>

              {/* Q&A Section */}
              <Text className="text-[13px] font-bold text-[#6B7280] tracking-widest uppercase mb-4">Questions & Answers</Text>

              <View className="gap-4 mb-6">
                {MOCK_REVIEW.questions.map((q, i) => {
                  const isCorrect = q.status === 'CORRECT';
                  return (
                    <View key={q.id} className="bg-white border border-[#E2E8F0] rounded-[20px] p-4">
                      {/* Question Header */}
                      <View className="flex-row items-start justify-between mb-4">
                        <Text className="flex-1 text-[15px] font-bold text-[#1E1E2D] leading-6 mr-3">
                          {i + 1}. {q.text}
                        </Text>
                        <View className={`px-2 py-1 rounded-full flex-row items-center border ${isCorrect ? 'bg-[#2A9A46]/10 border-[#2A9A46]/20' : 'bg-[#FB2C36]/10 border-[#FB2C36]/20'
                          }`}>
                          {isCorrect ? (
                            <TickCircle size={12} color="#2A9A46" variant="Linear" style={{ marginRight: 4 }} />
                          ) : (
                            <CloseCircle size={12} color="#FB2C36" variant="Linear" style={{ marginRight: 4 }} />
                          )}
                          <Text className={`text-[10px] font-black tracking-wider ${isCorrect ? 'text-[#2A9A46]' : 'text-[#FB2C36]'
                            }`}>{q.status}</Text>
                        </View>
                      </View>

                      {/* Student Answer */}
                      <View className={`rounded-[16px] p-4 mb-2 border flex-row items-center justify-between ${isCorrect ? 'bg-[#2A9A46]/5 border-[#2A9A46]/20' : 'bg-[#FB2C36]/5 border-[#FB2C36]/20'
                        }`}>
                        <View className="flex-1">
                          <Text className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-1">Student Answer</Text>
                          <Text className={`text-[14px] font-semibold ${isCorrect ? 'text-[#2A9A46]' : 'text-[#E7000B]'}`}>
                            {q.studentAnswer}
                          </Text>
                        </View>
                        {isCorrect ? (
                          <Ionicons name="checkmark" size={18} color="#2A9A46" />
                        ) : (
                          <Ionicons name="close" size={18} color="#E7000B" />
                        )}
                      </View>

                      {/* Correct Answer (if wrong) */}
                      {!isCorrect && q.correctAnswer && (
                        <View className="rounded-[16px] p-4 border bg-[#2A9A46]/5 border-[#2A9A46]/20 flex-row items-center justify-between mt-1">
                          <View className="flex-1">
                            <Text className="text-[10px] font-black text-[#2A9A46] uppercase tracking-widest mb-1">Correct Answer</Text>
                            <Text className="text-[14px] font-semibold text-[#2A9A46]">
                              {q.correctAnswer}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  )
                })}
              </View>

              <TouchableOpacity
                onPress={() => setSelectedStudent(null)}
                className="bg-[#F67300] py-4 rounded-2xl items-center mb-8"
              >
                <Text className="text-white font-bold text-[16px]">Close Review</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
