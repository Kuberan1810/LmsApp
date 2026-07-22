import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { DocumentText1, Profile2User } from 'iconsax-react-native';

export interface Course {
  id: string;
  title: string;
  batch: string;
  studentsCount: string;
  modulesCount: string;
  progress: number;
  bgColor: string;
}

interface CourseCardProps {
  course: Course;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export default function CourseCard({ course, onPress, style, className = '' }: CourseCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`${course.bgColor} rounded-[16px] p-5 h-[135px] justify-between border shadow-sm relative overflow-hidden ${className}`}
      style={[
        { borderColor: '#ffffff', borderWidth: 1 },
        style
      ]}
    >
      {/* Background icons */}
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
      <Text className="text-[14px] font-semibold text-[#333333] leading-snug pr-8" numberOfLines={2}>
        {course.title}
      </Text>

      <Text className="text-[10px] font-medium text-[#333333] leading-snug pr-8" numberOfLines={2}>
        {course.batch}
      </Text>

      <View className="flex-row items-center mt-1">
        {/* Students Count */}
        <View className="flex-row items-center mr-4">
          <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
            <Profile2User size={10} color="#626262" variant="Outline" />
          </View>
          <Text className="text-[12px] font-medium text-[#8C8E90] ml-1.5">
            {course.studentsCount}
          </Text>
        </View>

        {/* Modules Count */}
        <View className="flex-row items-center">
          <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
            <DocumentText1 size={10} color="#626262" variant="Outline" />
          </View>
          <Text className="text-[12px] font-medium text-[#8C8E90] ml-1.5">
            {course.modulesCount}
          </Text>
        </View>
      </View>

      {/* Progress Bar*/}
      <View className="flex-row items-center justify-between mt-2">
        <View className="flex-1 h-1.5 bg-white rounded-full mr-3 overflow-hidden">
          <View
            className="h-full bg-[#EE8B3A] rounded-full"
            style={{ width: `${course.progress}%` }}
          />
        </View>
        <View className="bg-white px-1.5 py-0.5 rounded-full border border-[#E5E5E5]">
          <Text className="text-[9px] font-bold text-gray-700">{course.progress}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
