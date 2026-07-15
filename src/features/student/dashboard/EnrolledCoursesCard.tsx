import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';

interface EnrolledCoursesCardProps {
  title: string;
  duration: string;
  lessons: string;
  bgColor: string;
}

export default function EnrolledCoursesCard({ title, duration, lessons, bgColor }: EnrolledCoursesCardProps) {
  return (
    <TouchableOpacity 
      className={`w-[260px] h-[130px] rounded-2xl p-5 mr-4 justify-between`}
      style={{ backgroundColor: bgColor }}
      activeOpacity={0.8}
    >
      <Text className="text-black font-semibold text-[15px] leading-6" numberOfLines={2}>
        {title}
      </Text>
      
      <View className="flex-row items-center justify-between mt-4">
        <View className="flex-row items-center bg-white/50 px-2 py-1.5 rounded-full">
          <Feather name="clock" size={12} color="#555" />
          <Text className="text-[11px] text-gray-700 ml-1.5 font-medium">{duration}</Text>
        </View>
        <View className="flex-row items-center bg-white/50 px-2 py-1.5 rounded-full">
          <Feather name="play-circle" size={12} color="#555" />
          <Text className="text-[11px] text-gray-700 ml-1.5 font-medium">{lessons}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
