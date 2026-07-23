import ReviewScreen from '@/features/instructor/dashboard/review';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

export default function ReviewRoute() {
    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right', 'bottom']}>
            <Stack.Screen options={{ headerShown: false }} />
            <ReviewScreen />
        </SafeAreaView>
    );
}
