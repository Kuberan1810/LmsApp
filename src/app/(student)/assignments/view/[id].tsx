import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ViewSubmission from '@/features/student/assignments/viewSubmission';
import { MOCK_ASSIGNMENTS } from '../index';

export default function ViewSubmissionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const assignment = MOCK_ASSIGNMENTS.find(a => a.id === id);

  if (!assignment) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      <ViewSubmission
        assignment={assignment}
        onBack={() => router.back()}
      />
    </SafeAreaView>
  );
}
