import { useTabBarScroll } from '@/context/TabBarVisibilityContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Header from '@/components/Student/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CourseCard } from './CourseCard';
import { LiveNowCard } from './LiveNowCard';
import { UpcomingClassesCard } from './UpcomingClassesCard';

export const MyCoursesScreen = () => {
  const router = useRouter();
  const scrollHandler = useTabBarScroll();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-4 pt-2">
        {/* Header */}
        <View className="mb-2">
          <Header title="My Courses" />
        </View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          {/* Horizontal Courses Scroll */}
          <View className="mb-6">
            <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible">
              <CourseCard
                title="AM101 - AI / ML Frontier AI Engineer"
                duration="3 Months"
                lessons="05 Lessons"
                bgColorClass="bg-[#D2E4E2]"
                onPress={() => router.push('/(student)/courses/details' as any)}
              />
              <CourseCard
                title="SS102 - System Architecture"
                duration="3 Months"
                lessons="12 Lessons"
                bgColorClass="bg-[#D8CAE8]"
              />
            </Animated.ScrollView>
          </View>

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
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};
