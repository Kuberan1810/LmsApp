import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { InfoCircle } from 'iconsax-react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

export default function ClassesProgressCard() {
  const [showTooltip, setShowTooltip] = useState(false);

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
    <View className="bg-white mx-5 mt-6 rounded-[24px] p-5 border border-[#F2EEF4] z-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4 z-20">
        <Text className="text-[20px] font-semibold text-[#333333]">Classes</Text>
        
        <View className="relative">
          <TouchableOpacity onPress={() => setShowTooltip(true)}>
            <InfoCircle size="20" color="#A0A0A0" />
          </TouchableOpacity>

          {showTooltip && (
            <>
              {/* Click outside overlay */}
              <Pressable 
                style={{ position: 'absolute', top: -1000, left: -1000, right: -1000, bottom: -1000 }}
                onPress={() => setShowTooltip(false)}
              />
              {/* Tooltip Box */}
              <View className="absolute top-8 -right-2 bg-[#333333] p-3 rounded-[12px] w-[260px] shadow-lg">
                <View className="absolute -top-1.5 right-3 w-3 h-3 bg-[#333333] rotate-45" />
                <Text className="text-white text-[12px] leading-[18px]">
                  Track your class attendance, attended, absent, and upcoming classes with overall attendance percentage.
                </Text>
              </View>
            </>
          )}
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-row items-center justify-between px-2 mb-6">
        {/* Left Side: Stats */}
        <View>
          <Text className="text-[15px] font-medium text-[#626262] mb-1">Attended</Text>
          <Text className="text-[20px] font-semibold text-[#333333]">21 / 38</Text>
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
                stroke="#21C45D"
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
                stroke="#D90015"
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
                stroke="#E7E7E7"
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
            <Text className="text-[20px] font-semibold text-[#626262]">65%</Text>
          </View>
        </View>
      </View>

      {/* Legend */}
      <View className="flex-row justify-center items-center gap-4">
        <View className="flex-row items-center">
          <View className="w-3.5 h-3.5 rounded-[4px] bg-[#21C45D] mr-1.5" />
          <Text className="text-[12px] font-medium text-[#626262]">Attended: {attended}</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3.5 h-3.5 rounded-[4px] bg-[#D90015] mr-1.5" />
          <Text className="text-[12px] font-medium text-[#626262]">Absent: {absent.toString().padStart(2, '0')}</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3.5 h-3.5 rounded-[4px] bg-[#E7E7E7] mr-1.5" />
          <Text className="text-[12px] font-medium text-[#626262]">Upcoming: {upcoming}</Text>
        </View>
      </View>
    </View>
  );
}
