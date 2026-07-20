import { useTabBarScroll } from '@/context/TabBarVisibilityContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Header from '@/components/Student/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LiveNowCard } from './LiveNowCard';
import { UpcomingClassesCard } from './UpcomingClassesCard';
import EnrollCourseCard, { EnrollCourseType } from '@/components/Student/EnrollCourseCard';

const COURSES: EnrollCourseType[] = [
  {
    code: 'AM101',
    name: 'AI / ML Frontier AI Engineer',
    duration: '3 Months',
    lessons: '05 Lessons',
    bgColor: 'bg-[#DDF0EB]',
    textColor: 'text-slate-800',
  },
  {
    code: 'SS102',
    name: 'System and Software System Pro',
    duration: '2 Months',
    lessons: '12 Lessons',
    bgColor: 'bg-[#E6DCF6]',
    textColor: 'text-slate-800',
  },
];

export const MyCoursesScreen = () => {
  const router = useRouter();
  const scrollHandler = useTabBarScroll();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header
        title='My Courses'
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Horizontal Courses Scroll */}
        <View className="mb-6">
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {COURSES.map((course, idx) => (
              <EnrollCourseCard
                key={idx}
                course={course}
                onCoursePress={(code) => router.push(`/(student)/courses/${code}`)}
              />
            ))}
          </Animated.ScrollView>
        </View>
        <View className="flex-1 px-4 pt-2">
          {/* Live Now Section */}
          <View className="bg-white rounded-[32px] p-5 mb-6 border border-gray-200">
            <LiveNowCard />
          </View>

          {/* Upcoming Classes Section */}
          <View className="bg-white rounded-[32px] p-5 border border-gray-200">
            <Text className="text-black text-lg font-medium mb-4 px-1">Upcoming Classes</Text>

            <UpcomingClassesCard
              month="JAN"
              day="25"
              courseTitle="AM101 - AI / ML Frontier AI Engineer"
              lessonName="Lesson name: AI safety & real-world use cases"
              time="10:00 AM - 11:30 AM"
              reminderSet={false}
            />

            <UpcomingClassesCard
              month="JAN"
              day="27"
              courseTitle="AM101 - AI / ML Frontier AI Engineer"
              lessonName="Lesson name: AI safety & real-world use cases"
              time="10:00 AM - 11:30 AM"
              reminderSet={true}
            />

            <UpcomingClassesCard
              month="JAN"
              day="28"
              courseTitle="AM101 - AI / ML Frontier AI Engineer"
              lessonName="Lesson name: AI safety & real-world use cases"
              time="10:00 AM - 11:30 AM"
              reminderSet={false}
            />
          </View>
        </View>
      </Animated.ScrollView>


    </SafeAreaView >
  );
};
