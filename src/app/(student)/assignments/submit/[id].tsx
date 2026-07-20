import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import SubmitAssignment from '@/features/student/assignments/SubmitAssignment';
import SubmissionSuccess from '@/features/student/assignments/SubmissionSuccess';
import { MOCK_ASSIGNMENTS } from '../index';

export default function SubmitAssignmentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [assignment, setAssignment] = useState(MOCK_ASSIGNMENTS.find(a => a.id === id) || null);

  if (!assignment) {
    return null;
  }

  const handleSubmissionSuccess = (submittedFiles: { name: string; size: string }[], notes: string) => {
    setAssignment(prev => prev ? { ...prev, status: 'Submitted', submittedFiles, submissionNotes: notes } : null);
    setShowSuccessPopup(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      <SubmitAssignment
        assignment={assignment}
        onBack={() => router.back()}
        onSuccess={handleSubmissionSuccess}
      />
      <SubmissionSuccess
        visible={showSuccessPopup}
        assignment={assignment}
        onViewSubmission={() => {
          setShowSuccessPopup(false);
          router.replace(`/(student)/assignments/view/${id}` as any);
        }}
        onBackToDashboard={() => {
          setShowSuccessPopup(false);
          router.replace('/(student)/dashboard/dashboard' as any);
        }}
      />
    </SafeAreaView>
  );
}
