import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export interface Assignment {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  description: string;
  status: 'Submitted' | 'In Progress' | 'Overdue';
  dateStr: string;
  mark?: string;
}

interface AssignmentCardProps {
  assignment: Assignment;
  onPress: (assignment: Assignment) => void;
}

export default function AssignmentCard({ assignment, onPress }: AssignmentCardProps) {
  const { title, courseCode, courseName, description, status, dateStr, mark } = assignment;

  const getStatusBadge = () => {
    switch (status) {
      case 'Submitted':
        return (
          <View className="flex-row items-center bg-[#2A9A46]/10 px-3 py-1.5 rounded-full self-start">
            <Text className="text-[#2A9A46] text-[12px] ">
              Submitted on {dateStr}
            </Text>
          </View>
        );
      case 'In Progress':
        return (
          <View className="flex-row items-center bg-[#FFEDDE] px-3 py-1.5 rounded-[1000px] self-start">
            <Text className="text-[#F67300] text-[12px]">
              In Progress
            </Text>
          </View>
        );
      case 'Overdue':
        return (
          <View className="flex-row items-center bg-[#F1351B]/10 px-3 py-1.5 rounded-full self-start">
            <Text className="text-[#F1351B] text-[12px]">
              Overdue
            </Text>
          </View>
        );
    }
  };

  const renderFooterLeft = () => {
    switch (status) {
      case 'Submitted':
        return (
          <View className="flex-row items-center">
            <Text className="text-[#F67300] text-[14px]">Mark: </Text>
            <Text className="text-[#F67300] text-[14px]">{mark || 'N/A'}</Text>
          </View>
        );
      case 'In Progress':
        return (
          <View className="flex-row items-center">
            <View className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[#F3F5F7] items-center justify-center shadow-xs">
              <MaterialCommunityIcons name="calendar-remove-outline" size={10} color="#9CA3AF" />
            </View>
            <Text className="text-[#626262] text-[12px] ml-1.5">
              Due {dateStr}
            </Text>
          </View>
        );
      case 'Overdue':
        return (
          <View className="flex-row items-center">
            <Ionicons name="warning-outline" size={12} color="#F1351B" />

            <Text className="text-[#F1351B] text-[14px] ml-1.5">
              Missed {dateStr}
            </Text>
          </View>
        );
    }
  };

  const renderActionButton = () => {
    if (status === 'Submitted') {
      return (
        <TouchableOpacity
          onPress={() => onPress(assignment)}
          className="bg-[#F2F2F2] px-3 py-2.5 rounded-xl"
        >
          <Text className="text-[#8C8C8C] text-[14px] font-medium">
            View Submission
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => onPress(assignment)}
          className="bg-[#F67300] px-3 py-2.5 rounded-xl"
        >
          <Text className="text-white text-[14px] font-medium">
            View Assignment
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View className="bg-white rounded-2xl p-6 mb-4">
      {/* Top Badge */}
      {getStatusBadge()}

      {/* Assignment Info */}
      <Text className="text-[14px] font-semibold text-[#333333] mt-3 mb-1" numberOfLines={2}>
        {title}
      </Text>

      <Text className="text-[12px] text-[#626262] mb-2.5">
        {courseCode} - {courseName}
      </Text>

      <Text className="text-[12px] text-[#626262] mb-4 leading-relaxed" numberOfLines={2}>
        {description}
      </Text>

      {/* Bottom Footer Row */}
      <View className="flex-row justify-between items-center">
        {renderFooterLeft()}
        {renderActionButton()}
      </View>
    </View>
  );
}
