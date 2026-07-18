import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import React from 'react';
import { useTabBarScroll } from '@/context/TabBarVisibilityContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecentCoursesSection from '@/features/student/dashboard/RecentCoursesSection';
import ClassesProgressCard from '@/features/student/dashboard/ClassesProgressCard';
import RecordingAlertCard from '@/features/student/dashboard/RecordingAlertCard';
import AttendanceCalendarSection from '@/features/student/dashboard/AttendanceCalendarSection';
import UpcomingScheduleSection from '@/features/student/dashboard/UpcomingScheduleSection';
import DashboardAssignmentsSection from '@/features/student/dashboard/DashboardAssignmentsSection';
import Header from '@/components/Student/Header';

export default function dashboard() {
  const scrollHandler = useTabBarScroll();

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <Header />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <RecentCoursesSection />
        <ClassesProgressCard />
        <RecordingAlertCard />
        <AttendanceCalendarSection />
        <UpcomingScheduleSection />
        <DashboardAssignmentsSection />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}