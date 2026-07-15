import { View, Text } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

interface DashboardAssignmentCardProps {
  title: string;
  dueDate: string;
  dueTime: string;
  status: 'In progress' | 'Completed';
}

export default function DashboardAssignmentCard({ title, dueDate, dueTime, status }: DashboardAssignmentCardProps) {
  const isCompleted = status === 'Completed';

  return (
    <View className="bg-white rounded-2xl p-5 mb-4 border border-gray-100">
      <View className="flex-row justify-between items-start mb-4">
        <Text className="text-[14px] font-semibold text-black flex-1 mr-4" numberOfLines={2}>
          {title}
        </Text>
        <View 
          className={`px-3 py-1.5 rounded-lg ${isCompleted ? 'bg-[#E8F8F0]' : 'bg-[#FFF3E8]'}`}
        >
          <Text 
            className={`text-[11px] font-medium ${isCompleted ? 'text-[#1DD75B]' : 'text-[#EE8B3A]'}`}
          >
            {status}
          </Text>
        </View>
      </View>

      <View className="gap-2.5">
        <View className="flex-row items-center">
          <Feather name="calendar" size={14} color="#A0A0A0" />
          <Text className="text-[12px] text-gray-500 ml-1.5">Due date: {dueDate}</Text>
        </View>
        <View className="flex-row items-center">
          <Feather name="clock" size={14} color="#A0A0A0" />
          <Text className="text-[12px] text-gray-500 ml-1.5">Due time: {dueTime}</Text>
        </View>
      </View>
    </View>
  );
}
