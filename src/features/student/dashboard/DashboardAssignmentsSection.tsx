import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DashboardAssignmentCard from './DashboardAssignmentCard';
import { router } from 'expo-router';
import BtnCom from '../../../components/BtnCom';
import { NoteText } from 'iconsax-react-native';

const DATES = [
  { day: 'Sun', date: '10', bg: 'bg-[#FFF3E8]', text: 'text-[#EE8B3A]' },
  { day: 'Mon', date: '11', bg: 'bg-[#2A9A46]/10', text: 'text-[#2A9A46]' },
  { day: 'Tue', date: '12', bg: 'bg-[#2A9A46]/10', text: 'text-[#2A9A46]' },
  { day: 'Wed', date: '13', bg: 'bg-[#2A9A46]/10', text: 'text-[#2A9A46]' },
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
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredAssignments = ASSIGNMENTS.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'In Progress') return item.status === 'In progress';
    if (activeFilter === 'Completed') return item.status === 'Completed';
    // 'Over Due' has no assignments in mock data, so it returns empty.
    return false;
  });

  return (
    <View className="bg-white mx-5 mt-6 rounded-3xl py-5 border border-[#F2EEF4]">
      <View className="flex-row justify-between items-start mb-6 px-5">
        <View>
          <Text className="text-[20px] font-semibold text-[#333333] mb-1">Assignments</Text>
          <Text className="text-[12px] text-[#626262]">Friday, 15 Jan, 2024</Text>
        </View>
        <BtnCom label="View all" onClick={() => router.push('/(student)/assignments')} />
      </View>

      {/* Dates Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingBottom: 20 }}
      >
        {DATES.map((item, idx) => (
          <View key={idx} className={`w-[52px] h-[52px] rounded-[16px] items-center justify-center ${item.bg}`}>
            <Text className={`text-[12px] font-medium ${item.text} mb-0.5`}>{item.day}</Text>
            <Text className={`text-[14px] font-medium ${item.text}`}>{item.date}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Filters Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingBottom: 20 }}
      >
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-[12px] ${isActive ? 'bg-[#F67300]' : 'bg-white border border-[#F2EEF4]'}`}
            >
              <Text className={`text-[14px] ${isActive ? 'text-white font-semibold' : 'text-[#626262] font-medium'}`}>
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View className="px-5">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((item) => (
            <DashboardAssignmentCard
              key={item.id}
              title={item.title}
              dueDate={item.dueDate}
              dueTime={item.dueTime}
              status={item.status}
            />
          ))
        ) : (
          <View className="flex flex-col items-center justify-center py-12 text-center">
            <View className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mb-4 text-[#F67300]">
              <NoteText size="32" color="#F67300" />
            </View>
            <Text className="text-[#626262]  text-base font-medium mb-1">
              No Assignments Found
            </Text>
            <Text className="text-[#989898]  text-sm">
              There are no Assignments for this batch yet.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
