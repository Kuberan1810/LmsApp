import { View, Text } from 'react-native';
import React from 'react';

const ACTIVITIES = [
    {
        id: '1',
        type: 'submission',
        studentName: 'Alex Johnson',
        text: 'submitted assignment',
        time: '2 mins ago',
        status: 'Reviewed',
    },
    {
        id: '2',
        type: 'submission',
        studentName: 'Alex Johnson',
        text: 'submitted assignment',
        time: '2 mins ago',
        status: 'Reviewed',
    },
    {
        id: '3',
        type: 'upload',
        text: 'Course content.pdf uploaded',
        time: '10 mins ago',
    },
    {
        id: '4',
        type: 'upload',
        text: 'Course content.pdf uploaded',
        time: '10 mins ago',
    },
];

export default function RecentActivity() {
    return (
        <View className="bg-white rounded-2xl p-4 mb-5 mx-5 border border-[#F2EEF4]">
            <Text className="text-[20px] font-bold text-[#0B1C30] mb-4">Recent activity</Text>

        </View>
    );
}
