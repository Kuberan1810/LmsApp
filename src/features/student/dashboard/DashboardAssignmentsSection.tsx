import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import DashboardAssignmentCard from './DashboardAssignmentCard';

import BtnCom from '../../../components/BtnCom';

const DATES = [
  { day: 'Sun', date: '10', bg: 'bg-[#FFF3E8]', text: 'text-[#EE8B3A]' },
  { day: 'Mon', date: '11', bg: 'bg-[#E8F8F0]', text: 'text-[#1DD75B]' },
  { day: 'Tue', date: '12', bg: 'bg-[#E8F8F0]', text: 'text-[#1DD75B]' },
  { day: 'Wed', date: '13', bg: 'bg-[#E8F8F0]', text: 'text-[#1DD75B]' },
  { day: 'Thu', date: '14', bg: 'bg-[#FDE8E8]', text: 'text-[#E61026]' },
  { day: 'Fri', date: '15', bg: 'bg-[#FCEDF9]', text: 'text-[#C42A96]' },
  { day: 'Sat', date: '16', bg: 'bg-white border border-gray-100', text: 'text-gray-400' },
];

const FILTERS = ['All', 'In Progress', 'Completed', 'Over Due'];

const ASSIGNMENTS = [
  {
    id: '1',
    title: 'AM101 - AI / ML Frontier AI Engineer',
    dueDate: 'Jan 17, 26',
    dueTime: '9:00 - 10:00 am',
    status: 'In progress' as const,
  },
  {
    id: '2',
    title: 'SS102 - System and Software System Pro',
    dueDate: 'Jan 15, 26',
    dueTime: '9:00 - 10:00 am',
    status: 'Completed' as const,
  },
];

export default function DashboardAssignmentsSection() {
  return (
    <View className="bg-white mx-5 mt-6 rounded-3xl py-5 shadow-sm border border-gray-50">
      <View className="flex-row justify-between items-start mb-6 px-5">
        <View>
          <Text className="text-[20px] font-semibold text-[#333333] mb-1">Assignments</Text>
          <Text className="text-[12px] text-gray-500">Friday, 15 Jan, 2024</Text>
        </View>
        <BtnCom label="View all" />
      </View>

      {/* Dates Horizontal Scroll */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingBottom: 20 }}
      >
        {DATES.map((item, idx) => (
          <View key={idx} className={`w-11 h-11 rounded-full items-center justify-center ${item.bg}`}>
            <Text className={`text-[8px] ${item.text} mb-0.5`}>{item.day}</Text>
            <Text className={`text-[10px] font-medium ${item.text}`}>{item.date}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Filters Horizontal Scroll */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingBottom: 20 }}
      >
        {FILTERS.map((filter, idx) => {
          const isActive = idx === 0;
          return (
            <TouchableOpacity 
              key={filter}
              className={`px-4 py-2 rounded-full ${isActive ? 'bg-[#EE8B3A]' : 'bg-white border border-gray-200'}`}
            >
              <Text className={`text-[12px] ${isActive ? 'text-white font-medium' : 'text-gray-500'}`}>
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View className="px-5">
        {ASSIGNMENTS.map((item) => (
          <DashboardAssignmentCard 
            key={item.id}
            title={item.title}
            dueDate={item.dueDate}
            dueTime={item.dueTime}
            status={item.status}
          />
        ))}
      </View>
    </View>
  );
}
