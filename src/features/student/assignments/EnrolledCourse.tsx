import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Course {
    code: string;
    name: string;
    duration: string;
    lessons: string;
    bgColor: string;
    textColor: string;
    iconBgColor: string;
    iconColor: string;
}

export const MOCK_COURSES: Course[] = [
    {
        code: 'AMIO1',
        name: 'AI / ML Frontier AI Engineer',
        duration: '3 Months',
        lessons: '05 Lessons',
        bgColor: 'bg-[#D2E4E2]',
        textColor: 'text-slate-800',
        iconBgColor: 'bg-white/40',
        iconColor: '#2C3E50',
    },
    {
        code: 'SS102',
        name: 'System Architecture',
        duration: '3 Months',
        lessons: '06 Lessons',
        bgColor: 'bg-[#D8CAE8]',
        textColor: 'text-slate-800',
        iconBgColor: 'bg-white/40',
        iconColor: '#2C3E50',
    },
];

interface EnrolledCourseProps {
    selectedCourse: string | null;
    onCoursePress: (courseCode: string) => void;
}

export default function EnrolledCourse({ selectedCourse, onCoursePress }: EnrolledCourseProps) {
    return (
        <View className="mb-6">
            <Text className="text-[20px] font-medium text-[#333333] px-5 mb-3.5">
                My enrolled courses
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            >
                {MOCK_COURSES.map((course, idx) => {
                    const isSelected = selectedCourse === course.code;
                    return (
                        <TouchableOpacity
                            key={idx}
                            onPress={() => onCoursePress(course.code)}
                            activeOpacity={0.7}
                            className={`${course.bgColor} rounded-2xl p-5 mr-4 w-[260px] h-[130px] justify-between border shadow-sm relative overflow-hidden`}
                            style={
                                isSelected
                                    ? { borderColor: '#e6e5e4ff', borderWidth: 2 }
                                    : { borderColor: '#ffffff', borderWidth: 1 }
                            }
                        >
                            <Ionicons
                                name="sparkles-outline"
                                size={38}
                                color="#FFFFFF"
                                style={{ position: 'absolute', right: 50, top: 0, opacity: 0.40 }}
                            />
                            <Ionicons
                                name="sparkles-outline"
                                size={20}
                                color="#FFFFFF"
                                style={{ position: 'absolute', right: 8, top: 36, opacity: 0.40, }}
                            />
                            <Ionicons
                                name="book"
                                size={50}
                                color="#FFFFFF"
                                style={{ position: 'absolute', right: 10, top: 70, opacity: 0.40, transform: [{ rotate: '-30deg' }] }}
                            />
                            <Ionicons
                                name="sparkles-outline"
                                size={30}
                                color="#FFFFFF"
                                style={{ position: 'absolute', right: 90, bottom: 8, opacity: 0.40 }}
                            />

                            {/* Course Title */}
                            <Text className={`text-[14px] font-semibold ${course.textColor} leading-snug pr-8`} numberOfLines={2}>
                                {course.code} - {course.name}
                            </Text>

                            <View className="flex-row items-center">
                                {/* Duration */}
                                <View className="flex-row items-center mr-4">
                                    <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
                                        <Ionicons name="time-outline" size={10} color="#626262" />
                                    </View>
                                    <Text className="text-[12px] font-medium text-[#626262] ml-1.5">
                                        {course.duration}
                                    </Text>
                                </View>

                                {/* Lessons */}
                                <View className="flex-row items-center">
                                    <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
                                        <Ionicons name="document-text-outline" size={10} color="#626262" />
                                    </View>
                                    <Text className="text-[12px] font-medium text-[#626262] ml-1.5">
                                        {course.lessons}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}
