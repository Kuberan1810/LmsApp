import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { Calendar, Clock } from 'iconsax-react-native';

interface ScheduleCardProps {
  title: string;
  time: string;
  date: string;
  instructorName: string;
  status: 'join' | 'soon';
}

export default function ScheduleCard({ title, time, date, instructorName, status }: ScheduleCardProps) {
  const isJoin = status === 'join';

  return (
    <View className="bg-[#FAFAFA] rounded-[24px] p-5 mb-4 border border-[#F2EEF4] flex-row items-center justify-between">
      
      {/* Left Content */}
      <View className="flex-1 mr-2">
        {/* Title */}
        <Text className="text-[16px] font-semibold text-[#333333] mb-4 tracking-tight">
          {title}
        </Text>
        
        {/* Time and Date */}
        <View className="flex-row items-center mb-4 gap-2 flex-wrap">
          <View className="flex-row items-center">
            <View className="bg-white border border-[#F2EEF4] rounded-[8px] p-1 mr-1.5">
              <Clock size="12" color="#626262" />
            </View>
            <Text className="text-[12px] font-medium text-[#626262]">{time}</Text>
          </View>
          
          <View className="flex-row items-center">
            <View className="bg-white border border-[#F2EEF4] rounded-[8px] p-1 mr-1.5">
              <Calendar size="12" color="#626262" />
            </View>
            <Text className="text-[12px] font-medium text-[#626262]">{date}</Text>
          </View>
        </View>

        {/* Instructor */}
        <Text className="text-[14px] font-medium text-[#626262]">
          {instructorName}
        </Text>
      </View>

      {/* CTA Button */}
      <TouchableOpacity 
        style={{ width: 80, height: 34 }}
        onPress={() => isJoin && router.push('/(student)/meet' as any)}
        className={`rounded-[14px] justify-center items-center ${isJoin ? 'bg-[#F67300]' : 'bg-[#E7E7E7]'}`}
      >
        <Text className={`text-[14px] font-semibold ${isJoin ? 'text-white' : 'text-[#909090]'}`}>
          {isJoin ? 'Join' : 'Soon'}
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}
