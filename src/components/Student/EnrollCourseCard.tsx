import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DocumentText1 } from 'iconsax-react-native';

export type EnrollCourseType = {
    code?: string;
    name: string;
    bgColor: string;
    textColor: string;
    duration: string;
    lessons: string;
};

export type EnrollCourseCardProps = {
    course: EnrollCourseType;
    isSelected?: boolean;
    onCoursePress?: (code: string) => void;
};

const getBorderColor = (bgColor: string) => {
    const bg = bgColor.toLowerCase();
    if (bg.includes('ddf0eb') || bg.includes('d2e4e2')) {
        return '#C0D9D6';
    }
    if (bg.includes('D8CAE8') || bg.includes('d8cae8')) {
        return '#C5B1DD';
    }
    return '#E5E7EB';
};

export default function EnrollCourseCard({ course, isSelected = false, onCoursePress }: EnrollCourseCardProps) {
    return (
        <TouchableOpacity
            onPress={() => onCoursePress?.(course.code || '')}
            activeOpacity={0.7}
            className={`${course.bgColor} rounded-2xl p-5 mr-4 w-[260px] h-[130px] justify-between border relative overflow-hidden`}
            style={
                isSelected
                    ? { borderColor: '#e6e5e4ff', borderWidth: 2 }
                    : { borderColor: getBorderColor(course.bgColor), borderWidth: 1 }
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
                style={{ position: 'absolute', right: 8, top: 36, opacity: 0.40 }}
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
            <Text className={`text-[14px] font-semibold ${course.textColor || 'text-slate-800'} leading-snug pr-8`} numberOfLines={2}>
                {course.code ? `${course.code} - ${course.name}` : course.name}
            </Text>

            <View className="flex-row items-center">
                {/* Duration */}
                <View className="flex-row items-center mr-4">
                    <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center">
                        <Ionicons name="time-outline" size={10} color="#626262" />
                    </View>
                    <Text className="text-[12px] font-medium text-[#626262] ml-1.5">
                        {course.duration}
                    </Text>
                </View>

                {/* Lessons */}
                <View className="flex-row items-center">
                    <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center">
                        <DocumentText1 size={10} color="#626262" variant="Linear" />
                    </View>
                    <Text className="text-[12px] font-medium text-[#626262] ml-1.5">
                        {course.lessons}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}