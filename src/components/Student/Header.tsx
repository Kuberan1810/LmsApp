import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NotificationBing, SearchNormal1 } from 'iconsax-react-native';

export default function Header() {
  return (
    <SafeAreaView edges={['top']} className="bg-white">
      <View className="px-6 pt-4 pb-4 border-b border-[#F9F9F9]">
        <View className="flex-row items-center justify-between">
          
          {/* Left: Greeting & Name (Replaces Logo) */}
          <View className="flex-1 pr-4">
            <Text className="text-[13px] text-[#A2A2A7] font-medium mb-1">
              Welcome back,
            </Text>
            <Text className="text-[24px] font-bold text-[#1E1E2D] tracking-tight" numberOfLines={1}>
              Philip Stanton
            </Text>
          </View>

          {/* Right: Actions */}
          <View className="flex-row items-center gap-2.5">
            {/* Search Button */}
            <TouchableOpacity 
              activeOpacity={0.7}
              className="w-11 h-11 rounded-[14px] border-[1.5px] border-[#F2EEF4] bg-white items-center justify-center"
            >
              <SearchNormal1 size={18} color="#1E1E2D" />
            </TouchableOpacity>

            {/* Notifications Button */}
            <TouchableOpacity 
              activeOpacity={0.7}
              className="w-11 h-11 rounded-[14px] border-[1.5px] border-[#F2EEF4] bg-white items-center justify-center relative"
            >
              <NotificationBing size={18} color="#1E1E2D" />
              {/* Notification Dot */}
              <View className="absolute top-[10px] right-[10px] w-2.5 h-2.5 bg-[#EE8B3A] rounded-full border-[1.5px] border-white" />
            </TouchableOpacity>

            {/* Profile Button */}
            <TouchableOpacity 
              activeOpacity={0.7}
              className="w-11 h-11 rounded-[14px] border-[1.5px] border-[#F2EEF4] bg-[#F67300] items-center justify-center ml-1"
            >
              <Text className="text-[14px] font-bold text-white tracking-wider">PS</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </SafeAreaView>
  );
}
