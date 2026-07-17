import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import React from 'react';
import { useTabBarScroll } from '@/context/TabBarVisibilityContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardHeader from '@/features/student/dashboard/DashboardHeader';
import RecentCoursesSection from '@/features/student/dashboard/RecentCoursesSection';
import ClassesProgressCard from '@/features/student/dashboard/ClassesProgressCard';
import RecordingAlertCard from '@/features/student/dashboard/RecordingAlertCard';
import AttendanceCalendarSection from '@/features/student/dashboard/AttendanceCalendarSection';
import UpcomingScheduleSection from '@/features/student/dashboard/UpcomingScheduleSection';
import DashboardAssignmentsSection from '@/features/student/dashboard/DashboardAssignmentsSection';

export default function dashboard() {
  const scrollHandler = useTabBarScroll();

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <DashboardHeader />
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