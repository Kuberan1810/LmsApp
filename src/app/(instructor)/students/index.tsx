import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Profile2User } from 'iconsax-react-native';

export default function AssignedCoursesScreen() {
  const router = useRouter();

  const MOCK_COURSES = [
    { id: 1, title: 'AI / ML Frontier AI Engineer', code: 'AM101' },
    { id: 2, title: 'Advanced Data Structures', code: 'CS201' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      <View className="px-5 pt-4 pb-4 bg-white border-b border-[#F2EEF4]">
        <Text className="text-[20px] font-medium text-[#333333]">Assigned Courses</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-5">
        {MOCK_COURSES.map(course => (
          <TouchableOpacity 
            key={course.id}
            onPress={() => router.push('/(instructor)/students/list')}
            className="bg-white p-5 rounded-[20px] border border-[#F2EEF4] mb-4 shadow-sm shadow-black/5 flex-row justify-between items-center"
          >
            <View>
              <Text className="text-[13px] text-[#6B7280] mb-1">{course.code}</Text>
              <Text className="text-[16px] font-bold text-[#1E1E2D]">{course.title}</Text>
            </View>
            <View className="w-10 h-10 rounded-full bg-[#FFF5ED] items-center justify-center">
              <Profile2User size={20} color="#F67300" variant="Bold" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
