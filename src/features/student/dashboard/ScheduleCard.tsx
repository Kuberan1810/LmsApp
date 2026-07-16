import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

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
    <View className="bg-[#FAFAFA] rounded-2xl p-5 mb-4 border border-gray-100">
      <Text className="text-[14px] font-semibold text-black mb-3">{title}</Text>
      
      <View className="flex-row items-center mb-4 gap-6">
        <View className="flex-row items-center">
          <Feather name="clock" size={14} color="#A0A0A0" />
          <Text className="text-[12px] text-gray-500 ml-1.5">{time}</Text>
        </View>
        <View className="flex-row items-center">
          <Feather name="calendar" size={14} color="#A0A0A0" />
          <Text className="text-[12px] text-gray-500 ml-1.5">{date}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden mr-2">
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=47' }} 
              className="w-full h-full"
            />
          </View>
          <Text className="text-[12px] text-gray-500">{instructorName}</Text>
        </View>
        
        <TouchableOpacity 
          className={`px-5 py-2 rounded-xl ${isJoin ? 'bg-[#EE8B3A]' : 'bg-[#F0F0F0]'}`}
        >
          <Text className={`text-[12px] font-medium ${isJoin ? 'text-white' : 'text-gray-500'}`}>
            {isJoin ? 'Join' : 'Soon'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
