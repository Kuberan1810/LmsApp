import { View, Text } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

export default function ClassesProgressCard() {
  const radius = 46;
  const strokeWidth = 22;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * radius;
  
  // Data
  const total = 38;
  const attended = 21;
  const absent = 4;
  const upcoming = 13;

  // Percentages
  const attendedPct = attended / total;
  const absentPct = absent / total;
  const upcomingPct = upcoming / total;

  // Cap gaps
  const gapAllowance = strokeWidth + 4;
  const getDash = (pct: number) => Math.max(0.1, (pct * circumference) - gapAllowance);

  // Dash arrays (length of the stroke)
  const attendedDash = getDash(attendedPct);
  const absentDash = getDash(absentPct);
  const upcomingDash = getDash(upcomingPct);

  // Offsets
  const attendedOffset = 0;
  const absentOffset = -(attendedPct * circumference);
  const upcomingOffset = -((attendedPct + absentPct) * circumference);

  return (
    <View className="bg-white mx-5 mt-6 rounded-[24px] p-5 shadow-sm border border-gray-50">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-[18px] font-bold text-[#333333]">Classes</Text>
        <Feather name="info" size={18} color="#A0A0A0" />
      </View>

      {/* Main Content */}
      <View className="flex-row items-center justify-between px-2 mb-6">
        {/* Left Side: Stats */}
        <View>
          <Text className="text-[15px] font-medium text-gray-400 mb-1">Attended</Text>
          <Text className="text-[22px] font-bold text-[#333333]">21 / 38</Text>
        </View>

        {/* Right Side: Donut Chart */}
        <View className="w-[120px] h-[120px] relative items-center justify-center">
          <Svg height="120" width="120" viewBox="0 0 120 120">
            <G rotation="-90" origin={`${cx}, ${cy}`}>
              {/* Attended (Green) */}
              <Circle
                cx={cx}
                cy={cy}
                r={radius}
                stroke="#1DD75B"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={`${attendedDash} ${circumference}`}
                strokeDashoffset={attendedOffset}
                strokeLinecap="round"
              />
              {/* Absent (Red) */}
              <Circle
                cx={cx}
                cy={cy}
                r={radius}
                stroke="#E61026"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={`${absentDash} ${circumference}`}
                strokeDashoffset={absentOffset}
                strokeLinecap="round"
              />
              {/* Upcoming (Grey) */}
              <Circle
                cx={cx}
                cy={cy}
                r={radius}
                stroke="#EBEBEB"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={`${upcomingDash} ${circumference}`}
                strokeDashoffset={upcomingOffset}
                strokeLinecap="round"
              />
            </G>
          </Svg>
          
          {/* Centered Text Overlay */}
          <View className="absolute inset-0 items-center justify-center">
            <Text className="text-[20px] font-semibold text-gray-500">65%</Text>
          </View>
        </View>
      </View>

      {/* Legend */}
      <View className="flex-row justify-center items-center gap-4">
        <View className="flex-row items-center">
          <View className="w-3.5 h-3.5 rounded-[4px] bg-[#1DD75B] mr-1.5" />
          <Text className="text-[12px] font-medium text-gray-500">Attended: {attended}</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3.5 h-3.5 rounded-[4px] bg-[#E61026] mr-1.5" />
          <Text className="text-[12px] font-medium text-gray-500">Absent: {absent.toString().padStart(2, '0')}</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3.5 h-3.5 rounded-[4px] bg-[#EBEBEB] mr-1.5" />
          <Text className="text-[12px] font-medium text-gray-500">Upcoming: {upcoming}</Text>
        </View>
      </View>
    </View>
  );
}
