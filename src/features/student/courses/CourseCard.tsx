import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

type CourseCardProps = {
  title: string;
  duration: string;
  lessons: string;
  bgColorClass: string;
  onPress?: () => void;
};

export const CourseCard = ({ title, duration, lessons, bgColorClass, onPress }: CourseCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} className={`w-72 h-36 rounded-3xl p-5 mr-4 justify-between overflow-hidden ${bgColorClass}`}>
      {/* Decorative background elements */}
      <View className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
      <View className="absolute right-8 bottom-4 w-12 h-12 bg-white/20 rounded-full blur-md" />

      <Text className="text-[#333333] font-semibold text-[14px] w-4/5 leading-snug" numberOfLines={2}>
        {title}
      </Text>

      <View className="flex-row items-center gap-6 mt-2">
        <View className="flex-row items-center gap-1.5">
          <View className="bg-white rounded-full p-1">
            <Feather name="clock" size={10} color="#8C8E90" />
          </View>
          <Text className="text-[#8C8E90] text-[12px] font-medium">{duration}</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View className="bg-white rounded-full p-1">
            <Feather name="book-open" size={10} color="#8C8E90" />
          </View>
          <Text className="text-[#8C8E90] text-[12px] font-medium">{lessons}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
