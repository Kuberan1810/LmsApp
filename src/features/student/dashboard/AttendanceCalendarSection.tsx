import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

type Status = 'present' | 'absent' | 'holiday' | 'weekend' | 'none';

const CALENDAR_DATA: { day: string; date: string; status: Status }[] = [
  // Row 1
  { day: 'Sun', date: '28', status: 'weekend' },
  { day: 'Mon', date: '29', status: 'present' },
  { day: 'Tue', date: '30', status: 'present' },
  { day: 'Wed', date: '31', status: 'present' },
  { day: 'Thu', date: '01', status: 'present' },
  { day: 'Fri', date: '02', status: 'present' },
  { day: 'Sat', date: '03', status: 'present' },
  // Row 2
  { day: 'Sun', date: '03', status: 'weekend' },
  { day: 'Mon', date: '04', status: 'present' },
  { day: 'Tue', date: '05', status: 'present' },
  { day: 'Wed', date: '06', status: 'present' },
  { day: 'Thu', date: '07', status: 'present' },
  { day: 'Fri', date: '08', status: 'present' },
  { day: 'Sat', date: '09', status: 'present' },
  // Row 3
  { day: 'Sun', date: '10', status: 'weekend' },
  { day: 'Mon', date: '11', status: 'present' },
  { day: 'Tue', date: '12', status: 'present' },
  { day: 'Wed', date: '13', status: 'present' },
  { day: 'Thu', date: '14', status: 'absent' },
  { day: 'Fri', date: '15', status: 'holiday' },
  { day: 'Sat', date: '16', status: 'none' },
  // Row 4
  { day: 'Sun', date: '17', status: 'weekend' },
  { day: 'Mon', date: '18', status: 'absent' },
  { day: 'Tue', date: '19', status: 'none' },
  { day: 'Wed', date: '20', status: 'none' },
  { day: 'Thu', date: '21', status: 'none' },
  { day: 'Fri', date: '22', status: 'none' },
  { day: 'Sat', date: '23', status: 'none' },
];

export default function AttendanceCalendarSection() {
  const getStatusStyles = (status: Status) => {
    switch (status) {
      case 'present': 
        return { bg: '#E8F8F0', day: '#1DD75B', date: '#1DD75B', border: 'transparent' };
      case 'absent': 
        return { bg: '#FDE8E8', day: '#E61026', date: '#E61026', border: 'transparent' };
      case 'holiday': 
        return { bg: '#FFF3E8', day: '#EE8B3A', date: '#EE8B3A', border: 'transparent' };
      case 'weekend': 
        return { bg: '#FFF3E8', day: '#333333', date: '#888888', border: 'transparent' };
      case 'none': 
      default: 
        return { bg: '#FFFFFF', day: '#333333', date: '#888888', border: '#E5E7EB' };
    }
  };

  return (
    <View className="bg-white mx-5 mt-6 rounded-[24px] p-5 shadow-sm border border-gray-50">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-[22px] font-bold text-[#333333]">Attendance</Text>
        
        <View className="flex-row items-center">
          <View className="bg-[#FFF3E8] px-3 py-2 rounded-xl mr-3 items-center">
            <Text className="text-[#EE8B3A] text-[12px] font-bold leading-tight">Fri</Text>
            <Text className="text-[#EE8B3A] text-[13px] font-bold leading-tight">15</Text>
          </View>
          <View>
            <Text className="text-[13px] text-gray-400 mb-0.5">15-Jan-2026</Text>
            <Text className="text-[14px] font-bold text-[#333333]">Friday</Text>
          </View>
        </View>
      </View>

      {/* Month Selector */}
      <View className="flex-row justify-center items-center mb-6 mt-2">
        <TouchableOpacity className="bg-[#FCEDF9] p-1.5 rounded-lg">
          <Entypo name="triangle-left" size={14} color="#C42A96" />
        </TouchableOpacity>
        <Text className="mx-6 font-semibold text-[15px] text-[#333333]">Jan 2026</Text>
        <TouchableOpacity className="bg-[#FCEDF9] p-1.5 rounded-lg">
          <Entypo name="triangle-right" size={14} color="#C42A96" />
        </TouchableOpacity>
      </View>

      {/* Grid */}
      <View className="flex-row flex-wrap justify-between gap-y-3">
        {CALENDAR_DATA.map((item, index) => {
          const styles = getStatusStyles(item.status);
          
          return (
            <View 
              key={index}
              style={{
                width: '13%', 
                backgroundColor: styles.bg,
                borderColor: styles.border,
                borderWidth: item.status === 'none' ? 1 : 0,
              }}
              className="aspect-[4/5] rounded-[16px] items-center justify-center"
            >
              <Text style={{ color: styles.day }} className="text-[11px] font-medium mb-0.5">
                {item.day}
              </Text>
              <Text style={{ color: styles.date }} className={`text-[12px] ${item.status === 'none' || item.status === 'weekend' ? 'font-normal' : 'font-semibold'}`}>
                {item.date}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Legend */}
      <View className="flex-row justify-center items-center mt-8 gap-6">
        <View className="flex-row items-center">
          <View className="w-3.5 h-3.5 rounded-[4px] bg-[#1DD75B] mr-2" />
          <Text className="text-[13px] text-gray-500 font-medium">Present</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3.5 h-3.5 rounded-[4px] bg-[#E61026] mr-2" />
          <Text className="text-[13px] text-gray-500 font-medium">Absent</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3.5 h-3.5 rounded-[4px] bg-[#FFB775] mr-2" />
          <Text className="text-[13px] text-gray-500 font-medium">Holiday</Text>
        </View>
      </View>
    </View>
  );
}
