import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type CourseCardProps = {
  title: string;
  duration: string;
  lessons: string;
  bgColorClass: string;
  onPress?: () => void;
};

export const CourseCard = ({ title, duration, lessons, bgColorClass, onPress }: CourseCardProps) => {
  
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className={`${bgColorClass} rounded-2xl p-5 mr-4 w-[260px] h-[130px] justify-between border shadow-sm relative overflow-hidden`}
      style={{ borderColor: '#ffffff', borderWidth: 1 }}
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
      <Text className={`text-[14px] font-semibold text-slate-800 leading-snug pr-8`} numberOfLines={2}>
        
        {title}
      </Text>

      <View className="flex-row items-center">
        {/* Duration */}
        <View className="flex-row items-center mr-4">
          <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
            <Ionicons name="time-outline" size={10} color="#626262" />
          </View>
          <Text className="text-[12px] font-medium text-[#626262] ml-1.5">
            {duration}
          </Text>
        </View>

        {/* Lessons */}
        <View className="flex-row items-center">
          <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
            <Ionicons name="document-text-outline" size={10} color="#626262" />
          </View>
          <Text className="text-[12px] font-medium text-[#626262] ml-1.5">
            {lessons}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
