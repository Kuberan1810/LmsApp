import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';
import { Download } from 'lucide-react-native';
import ReviewScreen from '@/features/instructor/dashboard/review';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AssignmentReviewRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    studentId?: string;
    studentName?: string;
    submittedOn?: string;
    notes?: string;
    fileName?: string;
  }>();

  const studentName = params.studentName || 'Kuberan';
  const studentId = params.studentId || '10';
  const submittedOn = params.submittedOn || 'Jul 14, 2026, 05:15 PM';
  const notes = params.notes || 'Please find my assignment submission files attached.';
  const fileName = params.fileName || 'Text_to_PDF_Onlinenotpad';

  const [marks, setMarks] = useState('90');
  const [feedback, setFeedback] = useState('');

  const handleSaveGrade = () => {
    router.back();
  };

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
                <Text className="text-[18px] font-bold text-[#1E1E2D] mr-3">View Submission</Text>
                <View className="bg-[#2A9A46]/10 px-2 py-1 rounded-full">
                  <Text className="text-[10px] font-bold text-[#2A9A46] uppercase tracking-wider">Submitted</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => router.back()} className="p-1">
                <Text className="text-[24px] font-light text-[#6B7280] leading-none">×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="px-5 pt-4 pb-10" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
              <View className="border-b border-[#F3F4F6] pb-4 mb-4">
                <Text className="text-[14px] text-[#626262]">
                  <Text className="font-semibold text-[#1A1A1A]">{studentName} ({studentId})</Text> · Submitted: {submittedOn}
                </Text>
              </View>

              {/* Student Notes Section */}
              <View className="mb-5">
                <Text className="text-[16px] font-bold text-[#333333] mb-3">Student Notes</Text>
                <View className="bg-[#FFFBF7] border-l-[5px] border-[#F67300] rounded-r-[16px] rounded-l-[4px] p-4 flex-row items-start">
                  <Text className="text-[14px] text-[#4D4D4D] italic flex-1 leading-relaxed">
                    "{notes}"
                  </Text>
                </View>
              </View>

              {/* Submitted Files Section */}
              <View className="mb-5">
                <Text className="text-[16px] font-bold text-[#333333] mb-3">Submitted Files</Text>
                <View className="bg-white border border-[#F2EEF4] rounded-[20px] py-1 px-1 flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1 mr-3">
                    <View className="w-16 h-13 p-4 rounded-[20px] bg-[#FFF0F0] items-center justify-center mr-3">
                      <ExpoImage
                        source={require('../../../../assets/images/pdficon.svg')}
                        style={{ width: 24, height: 24 }}
                        contentFit="contain"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-[14px] font-medium text-[#4D4D4D]" numberOfLines={1}>
                        {fileName}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity className="p-3 mr-1">
                    <Download size={20} color="#808080" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Grading & Feedback Section */}
              <View className="mb-2">
                <Text className="text-[16px] font-bold text-[#333333] mb-3">Grading & Feedback</Text>

                {/* Marks awarded */}
                <Text className="text-[14px] text-[#626262] font-semibold mb-2.5">Marks awarded (out of 100)</Text>
                <View className="bg-[#F9F9F9] rounded-[12px] px-4 py-2 flex-row items-center w-[160px] mb-4 border border-[#E2E8F0]">
                  <TextInput
                    value={marks}
                    onChangeText={setMarks}
                    keyboardType="numeric"
                    className="flex-1 text-[16px] font-semibold text-[#1A1A1A] p-0"
                  />
                  <View className="border-l border-[#E5E7EB] pl-3 ml-2">
                    <Text className="text-[14px] text-[#9CA3AF] font-semibold">/100</Text>
                  </View>
                </View>

                {/* Instructor Feedback */}
                <Text className="text-[14px] text-[#333333] font-semibold mb-3">Instructor Feedback</Text>
                <View className="bg-white border border-[#E2E8F0] rounded-[16px] p-3.5 min-h-[110px]">
                  <TextInput
                    value={feedback}
                    onChangeText={setFeedback}
                    placeholder="Write your context and feedback here..."
                    placeholderTextColor="#939393"
                    multiline
                    textAlignVertical="top"
                    className="flex-1 text-[13px] text-[#333333] p-0 leading-relaxed text-left"
                  />
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row items-center justify-end gap-3 mt-6 pt-4 border-t border-[#F3F4F6]">
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="bg-white border border-[#E5E7EB] px-6 h-11 rounded-[12px] items-center justify-center"
                  activeOpacity={0.8}
                >
                  <Text className="text-[#333333] font-semibold text-[15px]">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSaveGrade}
                  className="bg-[#F67300] px-6 h-11 rounded-[12px] items-center justify-center shadow-xs"
                  activeOpacity={0.8}
                >
                  <Text className="text-white font-semibold text-[15px]">Update Grade</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
