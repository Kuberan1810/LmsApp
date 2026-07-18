import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

type Status = 'present' | 'absent' | 'holiday' | 'weekend' | 'none';

export default function AttendanceCalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Jan 2026

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const generateDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const startOffset = firstDayOfMonth.getDay(); // 0 for Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Fit into 4, 5, or 6 weeks depending on offset and days
    const totalSlots = startOffset + daysInMonth <= 28 ? 28 : (startOffset + daysInMonth <= 35 ? 35 : 42);
    
    const daysArray = [];
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 0; i < totalSlots; i++) {
      const date = new Date(year, month, i - startOffset + 1);
      
      let status: Status = 'none';
      if (date.getMonth() !== month) {
         status = 'none'; // Days from prev/next month
      } else {
         const dayOfWeek = date.getDay();
         if (dayOfWeek === 0 || dayOfWeek === 6) {
            status = 'weekend';
         } else {
            // Mock attendance logic for demo purposes
            const d = date.getDate();
            if (d === 15) status = 'holiday';
            else if (d === 14 || d === 18) status = 'absent';
            else if (d > 23 && year === 2026 && month === 0) status = 'none'; // Replicate initial design partial attendance
            else status = 'present';
         }
      }
      
      daysArray.push({
        day: DAYS[date.getDay()],
        date: date.getDate().toString().padStart(2, '0'),
        status
      });
    }
    return daysArray;
  };

  const calendarData = generateDays();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthTitle = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const getStatusStyles = (status: Status) => {
    switch (status) {
      case 'present': 
        return { bg: '#DCFCE780', day: '#3EA465', date: '#3EA465', border: 'transparent' };
      case 'absent': 
        return { bg: '#FEE2E280', day: '#CE1919', date: '#CE1919', border: 'transparent' };
      case 'holiday': 
        return { bg: '#FFEDDD', day: '#FFBE85', date: '#FFBE85', border: 'transparent' };
      case 'weekend': 
        return { bg: '#FFEDDD', day: '#333333', date: '#777777', border: 'transparent' };
      case 'none': 
      default: 
        return { bg: '#FFFFFF', day: '#333333', date: '#777777', border: '#E5E7EB' };
    }
  };

  return (
    <View className="bg-white mx-5 mt-6 rounded-[28px] p-5 shadow-sm border border-gray-50">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-[24px] font-bold text-[#333333] tracking-tight">Attendance</Text>
        
        <View className="flex-row items-center">
          <View 
            style={{ width: 56, height: 52 }} 
            className="bg-[#FFEDDD] rounded-[16px] mr-3 items-center justify-center gap-0.5"
          >
            <Text className="text-[#F67300] text-[14px] font-medium leading-none">Fri</Text>
            <Text className="text-[#F67300] text-[14px] font-medium leading-none">15</Text>
          </View>
          <View>
            <Text className="text-[13px] text-gray-400 mb-0.5">15-Jan-2026</Text>
            <Text className="text-[14px] font-bold text-[#333333]">Friday</Text>
          </View>
        </View>
      </View>

      {/* Month Selector */}
      <View className="flex-row justify-center items-center mb-6">
        <TouchableOpacity 
          onPress={handlePrevMonth}
          className="bg-[#FCEDF9] w-[30px] h-[30px] items-center justify-center rounded-[8px]"
        >
          <Ionicons name="play" size={14} color="#C42A96" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text className="mx-6 font-semibold text-[14px] text-[#333333]">{monthTitle}</Text>
        <TouchableOpacity 
          onPress={handleNextMonth}
          className="bg-[#FCEDF9] w-[30px] h-[30px] items-center justify-center rounded-[8px]"
        >
          <Ionicons name="play" size={14} color="#C42A96" />
        </TouchableOpacity>
      </View>

      {/* Grid */}
      <View className="flex-row flex-wrap justify-between gap-y-3">
        {calendarData.map((item, index) => {
          const styles = getStatusStyles(item.status);
          
          return (
            <View 
              key={index}
              style={{
                width: '13%', 
                aspectRatio: 44 / 43,
                backgroundColor: styles.bg,
                borderColor: styles.border,
                borderWidth: item.status === 'none' ? 1 : 0,
              }}
              className="rounded-[14px] items-center justify-center py-1.5 gap-0.5"
            >
              <Text style={{ color: styles.day }} className="text-[14px] font-semibold leading-none text-center">
                {item.day}
              </Text>
              <Text style={{ color: styles.date }} className="text-[12px] font-medium leading-none text-center">
                {item.date}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Legend */}
      <View className="flex-row justify-center items-center mt-8 gap-5">
        <View className="flex-row items-center">
          <View className="w-3.5 h-3.5 rounded-[4px] bg-[#3EA465] mr-2" />
          <Text className="text-[14px] text-gray-500 font-medium">Present</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3.5 h-3.5 rounded-[4px] bg-[#CE1919] mr-2" />
          <Text className="text-[14px] text-gray-500 font-medium">Absent</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3.5 h-3.5 rounded-[4px] bg-[#FFBE85] mr-2" />
          <Text className="text-[14px] text-gray-500 font-medium">Holiday</Text>
        </View>
      </View>
    </View>
  );
}
