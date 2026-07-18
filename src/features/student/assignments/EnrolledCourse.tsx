import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import EnrollCourseCard from '../../../components/Student/EnrollCourseCard';

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
                        <EnrollCourseCard
                            key={idx}
                            course={course}
                            isSelected={isSelected}
                            onCoursePress={onCoursePress}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}
