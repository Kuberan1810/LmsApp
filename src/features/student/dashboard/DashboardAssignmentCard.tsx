import { View, Text } from 'react-native';
import React from 'react';
import { Calendar, Clock } from 'iconsax-react-native';

interface DashboardAssignmentCardProps {
  title: string;
  dueDate: string;
  dueTime: string;
  status: 'In progress' | 'Completed';
}

export default function DashboardAssignmentCard({ title, dueDate, dueTime, status }: DashboardAssignmentCardProps) {
  const isCompleted = status === 'Completed';

  return (
    <View className="bg-[#FAFAFA] rounded-[24px] p-5 mb-4 border border-gray-100 flex-row justify-between items-start">
      
      {/* Left Content */}
      <View className="flex-1 mr-4">
        {/* Title */}
        <Text className="text-[16px] font-semibold text-[#333333] mb-4 tracking-tight">
          {title}
        </Text>
        
        {/* Due Date */}
        <View className="flex-row items-center mb-2">
          <View className="bg-white border border-gray-100 rounded-[8px] p-1 mr-2">
            <Calendar size="14" color="#888888" />
          </View>
          <Text className="text-[14px] font-normal text-gray-500 leading-[17px]">Due date: {dueDate}</Text>
        </View>
        
        {/* Due Time */}
        <View className="flex-row items-center">
          <View className="bg-white border border-gray-100 rounded-[8px] p-1 mr-2">
            <Clock size="14" color="#888888" />
          </View>
          <Text className="text-[14px] font-normal text-gray-500 leading-[17px]">Due time: {dueTime}</Text>
        </View>
      </View>

      {/* Right Content / CTA */}
      <View 
        className={`px-5 h-[34px] rounded-[14px] justify-center items-center ${isCompleted ? 'bg-[#E5F1E8]' : 'bg-[#FFEDDE]'}`}
      >
        <Text 
          className={`text-[14px] font-medium leading-none ${isCompleted ? 'text-[#2A9A46]' : 'text-[#F67300]'}`}
        >
          {status}
        </Text>
      </View>
      
    </View>
  );
}
