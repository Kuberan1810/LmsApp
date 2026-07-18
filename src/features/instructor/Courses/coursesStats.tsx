import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const STATS = [
    {
        title: 'Attendance Rate',
        value: '87%',
        textColor: 'text-[#F67300]',
        subtitle: 'Avg. over last 30days',
    },
    {
        title: 'Total Classes',
        value: '26',
        denominator: '/31',
        subtitle: '81% Classes Completed',
    },
    {
        title: 'Total Students',
        value: '32',
        subtitle: 'Enrolled active students',
    },
    {
        title: 'Average Score',
        value: '78',
        denominator: '/100',
        subtitle: 'Last assessment',
    },
];

export default function CoursesStats() {
    const router = useRouter();

    return (
        <View className="px-5 mb-6">
            {/* Course Title*/}
            <View className="flex-row justify-between items-center mt-2 mb-6">
                <View className="flex-1 mr-3">
                    <Text className="text-[16px] font-medium text-[#333333] tracking-tight">Batch-01</Text>
                    <Text className="text-[12px] text-[#333333] mt-0.5">AM101 - AI / ML Frontier AI Engineer</Text>
                </View>
                <TouchableOpacity
                    onPress={() => router.push('/(instructor)/students')}
                    className="bg-[#F67300] px-[10px] py-1.5 rounded-[12px]"
                    activeOpacity={0.8}
                >
                    <Text className="text-white text-[12px] font-medium">View Student list</Text>
                </TouchableOpacity>
            </View>

            {/* Grid of stats */}
            <View className="flex-row flex-wrap gap-4">
                {STATS.map((item, index) => (
                    <View
                        key={index}
                        className="bg-white p-[10px] rounded-[12px]"
                        style={{ width: '45%', flexGrow: 1 }}
                    >
                        <Text className="text-[15px] font-medium text-[#333333]">{item.title}</Text>
                        <View className="flex-row items-baseline mt-2 mb-1">
                            <Text className={`text-[24px] font-medium ${item.textColor || 'text-[#0B1C30]'}`}>{item.value}</Text>
                            {item.denominator && (
                                <Text className="text-[14px] text-[#121212]">{item.denominator}</Text>
                            )}
                        </View>
                        <Text className="text-[12px] text-[#8C8E90]">{item.subtitle}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
