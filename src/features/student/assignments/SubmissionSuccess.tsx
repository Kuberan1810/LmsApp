import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Assignment } from './AssignmentCard';

interface SubmissionSuccessProps {
  visible: boolean;
  assignment: Assignment;
  onViewSubmission: () => void;
  onBackToDashboard: () => void;
}

export default function SubmissionSuccess({
  visible,
  assignment,
  onViewSubmission,
  onBackToDashboard,
}: SubmissionSuccessProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 items-center justify-center px-4">
        <View className="bg-white border border-[#F2EEF4] rounded-[24px] p-8 items-center w-full max-w-sm shadow-sm">
          <View className="mb-5">
            <Ionicons name="checkmark-circle" size={72} color="#049B3D" />
          </View>

          {/* Title */}
          <Text className="text-[24px] font-medium text-[#333333] mb-2 text-center">
            Submission success!
          </Text>

          {/* Description */}
          <Text className="text-[13px] text-[#626262] text-center leading-relaxed mb-6">
            Your assignment "{assignment.title}" has been successfully uploaded
          </Text>

          {/* View Submission Button */}
          <TouchableOpacity
            onPress={onViewSubmission}
            className="w-full bg-[#F67300] py-3 max-w-[200px] rounded-xl items-center mb-4"
          >
            <Text className="text-white text-[14px] font-medium">
              View My Submission
            </Text>
          </TouchableOpacity>

          {/* Back to Dashboard  */}
          <TouchableOpacity onPress={onBackToDashboard} className="py-2">
            <Text className="text-[#333333] text-[14px] font-medium">
              Back to dashboard
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
