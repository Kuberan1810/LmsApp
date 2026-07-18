import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Modular Feature Imports
import Header from '@/features/instructor/Courses/header';
import CoursesStats from '@/features/instructor/Courses/coursesStats';
import Curriculum from '@/features/instructor/Courses/Curriculum';
import RecentActivity from '@/features/instructor/Courses/RecentActivity';

export default function CoursesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFA]">
            {/* Header */}
            <Header
                title="Courses"
                onBackPress={() => router.back()}
                showSearchAndNotify={true}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >

                {/* Stats 2x2 Grid Component */}
                <CoursesStats />

                {/* Curriculum Component */}
                <Curriculum />

                {/* Recent Activity Component */}
                <RecentActivity />
            </ScrollView>
        </SafeAreaView>
    );
}
