import { View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardHeader from '@/features/instructor/dashboard/header';
import MyClasses from '@/features/instructor/dashboard/MyClasses';
import PendingReview from '@/features/instructor/dashboard/PendingReview';
import UpcomingSchedule from '@/features/instructor/dashboard/UpcomingSchedule';
import Animated from 'react-native-reanimated';
import { useTabBarScroll } from '@/context/TabBarVisibilityContext';

export default function InstructorDashboard() {
    const scrollHandler = useTabBarScroll();

    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFA]">
            <Animated.ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                {/* Header */}
                <DashboardHeader />

                {/* My Courses Section */}
                <MyClasses />



                {/* Upcoming Teaching Schedule */}
                <UpcomingSchedule />
                {/* Pending Student Reviews */}
                <PendingReview />
            </Animated.ScrollView>
        </SafeAreaView>
    );
}
