import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Modular Feature Imports
import Header from '@/components/Instructor/header';
import CoursesStats from '@/features/instructor/Courses/coursesStats';
import UpcomingSchedule from '@/features/instructor/Courses/UpcomingSchedule';
import Curriculum from '@/features/instructor/Courses/Curriculum';
import FAQ from '@/features/instructor/Courses/faq';
import ExistingResources from '@/features/instructor/Courses/ExistingResources';

export default function CoursesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
            {/* Header with Logo */}
            <Header />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Stats 2x2 Grid Component */}
                <CoursesStats />

                {/* Upcoming Schedule Component */}
                <UpcomingSchedule />

                {/* Curriculum Component */}
                <Curriculum />

                {/* Frequently Asked Questions */}
                <FAQ />

                {/* Existing Resources Component */}
                <ExistingResources />

            </ScrollView>
        </SafeAreaView>
    );
}
