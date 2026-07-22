import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TickCircle, CloseCircle } from 'iconsax-react-native';
import ReviewScreen from '@/features/instructor/dashboard/review';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MOCK_REVIEW = {
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

export default function TestReviewRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    studentId?: string;
    studentName?: string;
    submittedAt?: string;
    points?: string;
  }>();

  const studentName = params.studentName || 'Kuberan';
  const studentId = params.studentId || '10';
  const submittedAt = params.submittedAt || '18 Jul, 12:28';
  const points = params.points || '8';

  return (
    <View className="flex-1">
      <ReviewScreen />

      <Modal
        visible={true}
        transparent={true}
        animationType="slide"
        onRequestClose={() => router.back()}
      >
        <View className="flex-1 bg-black/40 justify-end">
          <TouchableOpacity
            className="absolute inset-0"
            activeOpacity={1}
            onPress={() => router.back()}
          />
          <View
            className="bg-white rounded-t-[24px] w-full"
            style={{
              maxHeight: SCREEN_HEIGHT * 0.8,
              paddingBottom: Math.max(insets.bottom, 20)
            }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-5 border-b border-[#E2E8F0] bg-white rounded-t-[24px]">
              <View className="flex-row items-center">
                <Text className="text-[18px] font-bold text-[#1E1E2D] mr-3">Performance Review</Text>
                <View className="bg-[#2A9A46]/10 px-2 py-1 rounded-full">
                  <Text className="text-[10px] font-bold text-[#2A9A46] uppercase tracking-wider">Submitted</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => router.back()} className="p-1">
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView className="px-5 pt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
              {/* Student Profile Card */}
              <View className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 mb-6">
                <Text className="text-[18px] font-bold text-[#1E1E2D] mb-1">{studentName}</Text>
                <View className="flex-row items-center mb-4">
                  <Text className="text-[12px] text-[#6B7280]">ID: <Text className="font-bold text-[#F67300]">{studentId}</Text></Text>
                  <View className="w-1 h-1 bg-[#D1D5DB] rounded-full mx-2" />
                  <Text className="text-[12px] font-medium text-[#4B5563]">Submitted</Text>
                  <View className="w-1 h-1 bg-[#D1D5DB] rounded-full mx-2" />
                  <Text className="text-[12px] text-[#808080]">{submittedAt}</Text>
                </View>

                <View className="bg-white border border-[#F2EEF4] rounded-[16px] py-4 items-center">
                  <Text className="text-[28px] font-black text-[#F67300]">{points}</Text>
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
                onPress={() => router.back()}
                className="bg-[#F67300] py-4 rounded-2xl items-center mb-8"
              >
                <Text className="text-white font-bold text-[16px]">Close Review</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
