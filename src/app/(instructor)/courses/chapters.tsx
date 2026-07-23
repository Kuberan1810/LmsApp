import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chapters, { FileItem } from '@/features/instructor/Courses/chapters/Chapters';
import { curriculumState } from '@/utils/curriculumState';

export default function ChapterRoute() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const id = (params.id as string) || '';
  const moduleId = (params.moduleId as string) || '';
  const title = (params.title as string) || 'Chapter Title';
  const moduleName = (params.moduleName as string) || 'Module Title';
  const classContent = params.classContent !== undefined ? (params.classContent as string) : undefined;
  const keyTopics = params.keyTopics !== undefined ? (params.keyTopics as string) : undefined;
  const resources = params.resources ? (JSON.parse(params.resources as string) as FileItem[]) : undefined;
  const initialIsEditing = params.initialIsEditing === 'true';

  const chapterData = {
    id,
    title,
    chapterTitle: title,
    moduleName,
    classContent,
    keyTopics,
    resources,
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right', 'bottom']}>
      <Chapters
        chapter={chapterData}
        chapterTitle={title}
        moduleName={moduleName}
        initialIsEditing={initialIsEditing}
        onBack={() => router.back()}
        onSave={(data) => {
          curriculumState.updateChapter(moduleId, id, {
            title: data.title,
            classContent: data.classContent,
            keyTopics: data.keyTopics,
            resources: data.resources,
          });
        }}
      />
    </SafeAreaView>
  );
}

