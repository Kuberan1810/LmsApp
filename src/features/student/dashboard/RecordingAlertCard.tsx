import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { InfoCircle, Calendar, Clock } from 'iconsax-react-native';

export default function RecordingAlertCard() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <View className="bg-white mx-5 mt-6 rounded-[24px] p-5 border border-[#F2EEF4] z-10">
      <View className="flex-row justify-between items-center mb-6 z-20">
        <Text className="text-[20px] font-semibold text-[#333333]">Recording</Text>
        
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
              <View className="absolute top-8 -right-2 bg-[#333333] p-3 rounded-[12px] w-[220px] shadow-lg">
                <View className="absolute -top-1.5 right-3 w-3 h-3 bg-[#333333] rotate-45" />
                <Text className="text-white text-[12px] leading-[18px]">
                  Recording will be updated tomorrow. Please check back later.
                </Text>
              </View>
            </>
          )}
        </View>
      </View>

      <Text className="text-[15px] font-medium text-[#333333] mb-2">You missed a class yesterday</Text>
      <Text className="text-[13px] text-[#626262] mb-4">AI / ML Live Class - Neural Networks</Text>

      <View className="flex-row items-center mb-6 mt-2">
        <View className="flex-row items-center mr-6 gap-2">
          <View className="bg-white rounded-[10px] p-1.5 shadow-sm items-center justify-center border border-[#F2EEF4]">
            <Calendar size="14" color="#626262" />
          </View>
          <Text className="text-[14px] text-[#626262] font-medium">Jan 14, 26</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <View className="bg-white rounded-[10px] p-1.5 shadow-sm items-center justify-center border border-[#F2EEF4]">
            <Clock size="14" color="#626262" />
          </View>
          <Text className="text-[14px] text-[#626262] font-medium">01 hr 10m</Text>
        </View>
      </View>

      <TouchableOpacity className="bg-[#EE8B3A] rounded-2xl py-3.5 items-center">
        <Text className="text-white font-medium text-[15px]">Watch Recording</Text>
      </TouchableOpacity>
    </View>
  );
}
