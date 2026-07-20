import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AssignmentDetail from '@/features/student/assignments/AssignmentDetail';
import SubmissionSuccess from '@/features/student/assignments/SubmissionSuccess';
import { MOCK_ASSIGNMENTS } from './index';

export default function AssignmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const assignment = MOCK_ASSIGNMENTS.find(a => a.id === id);

  if (!assignment) {
    return null; // Or some fallback UI
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      <AssignmentDetail
        assignment={assignment}
        onBack={() => router.back()}
        onSubmit={() => router.push(`/(student)/assignments/submit/${id}` as any)}
      />
      <SubmissionSuccess
        visible={showSuccessPopup}
        assignment={assignment}
        onViewSubmission={() => {
          setShowSuccessPopup(false);
          router.push(`/(student)/assignments/view/${id}` as any);
        }}
        onBackToDashboard={() => {
          setShowSuccessPopup(false);
          router.replace('/(student)/dashboard/dashboard' as any);
        }}
      />
    </SafeAreaView>
  );
}
