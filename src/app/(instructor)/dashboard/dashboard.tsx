import { View, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardHeader from '@/features/instructor/dashboard/header';
import MyClasses from '@/features/instructor/dashboard/MyClasses';
import PendingReview from '@/features/instructor/dashboard/PendingReview';
import UpcomingSchedule from '@/features/instructor/dashboard/UpcomingSchedule';

export default function InstructorDashboard() {
    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFA]">
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Header */}
                <DashboardHeader />

                {/* My Courses Section */}
                <MyClasses />



                {/* Upcoming Teaching Schedule */}
                <UpcomingSchedule />
                {/* Pending Student Reviews */}
                <PendingReview />
            </ScrollView>
        </SafeAreaView>
    );
}
