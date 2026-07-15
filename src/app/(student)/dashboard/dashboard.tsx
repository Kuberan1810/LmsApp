import { View, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardHeader from '@/features/student/dashboard/DashboardHeader';
import RecentCoursesSection from '@/features/student/dashboard/RecentCoursesSection';
import ClassesProgressCard from '@/features/student/dashboard/ClassesProgressCard';
import RecordingAlertCard from '@/features/student/dashboard/RecordingAlertCard';
import AttendanceCalendarSection from '@/features/student/dashboard/AttendanceCalendarSection';
import UpcomingScheduleSection from '@/features/student/dashboard/UpcomingScheduleSection';
import DashboardAssignmentsSection from '@/features/student/dashboard/DashboardAssignmentsSection';

export default function dashboard() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <DashboardHeader />
        <RecentCoursesSection />
        <ClassesProgressCard />
        <RecordingAlertCard />
        <AttendanceCalendarSection />
        <UpcomingScheduleSection />
        <DashboardAssignmentsSection />
      </ScrollView>
    </SafeAreaView>
  );
}