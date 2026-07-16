import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function RecordingAlertCard() {
  return (
    <View className="bg-white mx-5 mt-6 rounded-3xl p-5 shadow-sm border border-gray-50">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-[17px] font-semibold text-[#333333]">Recording</Text>
        <Feather name="info" size={18} color="#A0A0A0" />
      </View>

      <Text className="text-[15px] font-medium text-black mb-2">You missed a class yesterday</Text>
      <Text className="text-[13px] text-gray-500 mb-4">AI / ML Live Class - Neural Networks</Text>

      <View className="flex-row items-center mb-6 gap-6">
        <View className="flex-row items-center">
          <Feather name="calendar" size={14} color="#A0A0A0" />
          <Text className="text-[12px] text-gray-500 ml-1.5">Jan 14, 26</Text>
        </View>
        <View className="flex-row items-center">
          <Feather name="clock" size={14} color="#A0A0A0" />
          <Text className="text-[12px] text-gray-500 ml-1.5">01 hr 10m</Text>
        </View>
      </View>

      <TouchableOpacity className="bg-[#EE8B3A] rounded-2xl py-3.5 items-center">
        <Text className="text-white font-medium text-[15px]">Watch Recording</Text>
      </TouchableOpacity>
    </View>
  );
}
