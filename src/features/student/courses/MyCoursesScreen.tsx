import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { useTabBarScroll } from '@/context/TabBarVisibilityContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
        <View className="flex-row items-center justify-between mb-6 mt-2">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity className="p-1">
              <Feather name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-black">My Courses</Text>
          </View>
          <View className="flex-row items-center gap-[10px]">
            <TouchableOpacity className="w-[30px] h-[30px] rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] items-center justify-center">
              <Feather name="search" size={14} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              className="w-[30px] h-[30px] rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] items-center justify-center relative"
              onPress={() => router.push('/(student)/notifications' as any)}
            >
              <View className="absolute top-[6px] right-[8px] w-1.5 h-1.5 bg-orange-500 rounded-full z-10" />
              <Ionicons name="notifications-outline" size={14} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/(student)/profile/profile' as any)}
              className="w-[30px] h-[30px] rounded-lg overflow-hidden bg-[#FCE7F3] items-center justify-center"
            >
              <Text className="text-[#BE185D] text-[12px] font-medium">PS</Text>
            </TouchableOpacity>
          </View>
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
          <View className="bg-white rounded-[32px] p-5 shadow-sm shadow-gray-200 mb-6">
             <LiveNowCard />
          </View>

          {/* Upcoming Classes Section */}
          <View className="bg-white rounded-[32px] p-5 shadow-sm shadow-gray-200">
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
