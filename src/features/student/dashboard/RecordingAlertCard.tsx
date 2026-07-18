import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { InfoCircle, Calendar, Clock } from 'iconsax-react-native';

export default function RecordingAlertCard() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <View className="bg-white mx-5 mt-6 rounded-[24px] p-5 shadow-sm border border-gray-50 z-10">
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

      <Text className="text-[15px] font-medium text-black mb-2">You missed a class yesterday</Text>
      <Text className="text-[13px] text-gray-500 mb-4">AI / ML Live Class - Neural Networks</Text>

      <View className="flex-row items-center mb-6">
        <View className="flex-row items-center mr-6">
          <Calendar size="14" color="#888888" />
          <Text className="text-[12px] text-gray-500 ml-1.5">Jan 14, 26</Text>
        </View>
        <View className="flex-row items-center">
          <Clock size="14" color="#888888" />
          <Text className="text-[12px] text-gray-500 ml-1.5">01 hr 10m</Text>
        </View>
      </View>

      <TouchableOpacity className="bg-[#EE8B3A] rounded-2xl py-3.5 items-center">
        <Text className="text-white font-medium text-[15px]">Watch Recording</Text>
      </TouchableOpacity>
    </View>
  );
}
