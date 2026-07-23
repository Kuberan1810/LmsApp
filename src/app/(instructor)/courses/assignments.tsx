import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Assignments, { AssignmentData } from '@/features/instructor/Courses/assignment/assignments';
import { curriculumState } from '@/utils/curriculumState';

export default function AssignmentRoute() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const id = (params.id as string) || '';
  const moduleId = (params.moduleId as string) || '';
  const title = (params.title as string) || 'Build Q&A system using RAG';
  const moduleName = (params.moduleName as string) || 'Module 1: Module-1';
  const batch = (params.batch as string) || 'Batch 02';
  const dueDate = (params.dueDate as string) || '18-07-2026';
  const dueTime = (params.dueTime as string) || '11:59 PM';
  const description = (params.description as string) || '';
  const objective = (params.objective as string) || '';
  const expectedOutcome = (params.expectedOutcome as string) || '';
  const resources = params.resources ? JSON.parse(params.resources as string) : undefined;

  const initialIsEditing = params.initialIsEditing === 'true';

  const assignmentData: AssignmentData = {
    id,
    title,
    moduleName,
    batch,
    dueDate,
    dueTime,
    description,
    objective,
    expectedOutcome,
    resources,
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right', 'bottom']}>
      <Assignments
        assignment={assignmentData}
        initialIsEditing={initialIsEditing}
        onBack={() => router.back()}
        onSave={(data) => {
          curriculumState.updateAssignment(moduleId, id, {
            title: data.title,
            due: data.dueDate,
            dueTime: data.dueTime,
            description: data.description,
            objective: data.objective,
            expectedOutcome: data.expectedOutcome,
            resources: data.resources,
          });
        }}
      />
    </SafeAreaView>
  );
}


