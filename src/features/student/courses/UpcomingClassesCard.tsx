import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type UpcomingClassesCardProps = {
  month: string;
  day: string;
  courseTitle: string;
  lessonName: string;
  time: string;
  reminderSet?: boolean;
};

export const UpcomingClassesCard = ({
  month,
  day,
  courseTitle,
  lessonName,
  time,
  reminderSet = false,
}: UpcomingClassesCardProps) => {
  return (
    <View className="flex-row items-center rounded-2xl border border-gray-100 bg-white p-4 mb-4 shadow-sm shadow-gray-100">
      {/* Date Badge */}
      <View className="w-16 h-16 items-center justify-center rounded-xl bg-orange-50 mr-4">
        <Text className="text-gray-500 text-xs font-semibold">{month}</Text>
        <Text className="text-black text-xl font-bold">{day}</Text>
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text className="text-[#333333] font-semibold text-[14px] mb-1" numberOfLines={1}>
          {courseTitle}
        </Text>
        <Text className="text-gray-500 text-xs mb-2" numberOfLines={1}>
          {lessonName}
        </Text>

        <View className="flex-row items-center mb-2">
          <Feather name="clock" size={12} color="#9CA3AF" />
          <Text className="text-gray-400 text-xs ml-1">{time}</Text>
        </View>

        <TouchableOpacity className="flex-row items-center">
          <Ionicons
            name={reminderSet ? "notifications-off-outline" : "notifications-outline"}
            size={14}
            color={reminderSet ? "#9CA3AF" : "#F97316"}
          />
          <Text className={`text-xs ml-1 font-medium ${reminderSet ? 'text-gray-400' : 'text-orange-500'}`}>
            {reminderSet ? 'Reminder Set' : 'Set Reminder'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
