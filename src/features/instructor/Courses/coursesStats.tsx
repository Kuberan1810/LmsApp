import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const STATS = [
    {
        title: 'Total Students',
        value: '0',
        subtitle: 'Enrolled students',
    },
    {
        title: 'Attendance Rate',
        value: '0%',
        textColor: 'text-[#F67300]',
        subtitle: 'Average attendance',
    },
    {
        title: 'Live Sessions',
        value: '0',
        subtitle: '1 Assignments, 1 Tests',
    },
    {
        title: 'Completed Classes',
        value: '0',
        denominator: '/ 0',
        subtitle: '0% classes completed',
    },
];

export default function CoursesStats() {
    const router = useRouter();

    return (
        <>
            <View className="bg-white rounded-[16px] px-4 py-4 mb-5 border border-[#F2EEF4] mx-5">
                {/* Course Title*/}
                <View className="flex-row justify-between items-center">
                    <View className="flex-1 mr-3">
                        <Text className="text-[16px] font-semibold text-[#0B1C30] tracking-tight">Batch-B</Text>
                        <Text className="text-[12px] text-[#8C8E90] mt-0.5">AA101 - AI</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('/(instructor)/courses/students')}
                        className="bg-[#F67300] px-4 py-2 rounded-[6px]"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-[12px] font-medium">View Students</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Grid of stats */}
            <View className="mx-5 mb-5">
                <View className="flex-row flex-wrap gap-2">
                    {STATS.map((item, index) => (
                        <View
                            key={index}
                            className="bg-white p-4 rounded-[16px] border border-[#F2EEF4]"
                            style={{ width: '45%', flexGrow: 1 }}
                        >
                            <Text className="text-[15px] font-medium text-[#333333]">{item.title}</Text>
                            <View className="flex-row items-baseline mt-1 mb-1">
                                <Text className={`text-[20px] font-semibold ${item.textColor || 'text-[#0B1C30]'}`}>{item.value}</Text>
                                {item.denominator && (
                                    <Text className="text-[20px] text-[#121212] ml-0.5">{item.denominator}</Text>
                                )}
                            </View>
                            <Text className="text-[12px] text-[#99A1AF]">{item.subtitle}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </>
    );
}
