import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import CourseCard from '@/components/Instructor/CourseCard';

export const COURSES = [
  {
    id: '1',
    title: 'AM101 - AI / ML Frontier AI Engineer',
    batch: 'Batch-01',
    studentsCount: '32 Students',
    modulesCount: '3 Modules Completed',
    progress: 35,
    bgColor: 'bg-[#D2E4E2]',
  },
  {
    id: '2',
    title: 'SS102 - System Architecture',
    batch: 'Batch-02',
    studentsCount: '24 Students',
    modulesCount: '5 Modules Completed',
    progress: 60,
    bgColor: 'bg-[#D8CAE8]',
  },
];

export default function MyClasses() {
  const router = useRouter();

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-5 mb-4">
        <Text className="text-[20px] font-semibold text-[#333333]">My Classes</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {COURSES.map((course) => (
          <CourseCard 
            key={course.id}
            course={course}
            onPress={() => router.push(`/(instructor)/courses/${course.id}`)}
            style={{ marginRight: 16, width: 280 }}
          />
        ))}
      </ScrollView>
    </View>
  );
}
