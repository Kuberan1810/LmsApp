import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import InstructorHeader from '@/components/Instructor/InstructorHeader';
import CourseCard from '@/components/Instructor/CourseCard';
import { COURSES } from '@/features/instructor/dashboard/MyClasses';

export default function AssignedCoursesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      <InstructorHeader 
        title="Students" 
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 120 }}
      >
        {COURSES.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onPress={() => router.push('/(instructor)/students/list')}
            style={{ width: '100%', marginBottom: 16 }}
          />
        ))}
        
        {COURSES.length === 0 && (
            <View className="items-center justify-center py-10">
                <Text className="text-[#8C8E90] text-[14px] font-medium">No courses available.</Text>
            </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
