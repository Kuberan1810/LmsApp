import { View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardHeader from '@/components/Instructor/header';
import MyClasses from '@/features/instructor/dashboard/MyClasses';
import PendingReview from '@/features/instructor/dashboard/PendingReview';
import UpcomingSchedule from '@/features/instructor/dashboard/UpcomingSchedule';
import Animated from 'react-native-reanimated';
import { useTabBarScroll } from '@/context/TabBarVisibilityContext';
import Header from '@/components/Student/Header';

export default function InstructorDashboard() {
    const scrollHandler = useTabBarScroll();

    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFA]">
            <DashboardHeader />
            <Animated.ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                {/* Header */}
                {/*  */}

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
