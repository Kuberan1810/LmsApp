import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Notification, NotificationBing, SearchNormal1 } from 'iconsax-react-native';

export default function Header() {
  return (
    <SafeAreaView>
      <View className="px-5 pt-4 pb-2">
        {/* Top Navigation Row */}
        <View className="flex-row items-center justify-between mb-8">
          {/* Logo */}
          <View className="w-24 h-8 justify-center">
            <Image
              source={require('../../../assets/images/header-logo.svg')}
              contentFit="contain"
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          {/* Header Action Buttons */}
          <View className="flex-row items-center gap-3">
            {/* Search Button */}
            <TouchableOpacity className="w-11 h-11 rounded-[14px] border-[1.5px] border-[#F2F2F2] bg-white items-center justify-center">
              <SearchNormal1 size={20} color="#626262" />
            </TouchableOpacity>

            {/* Notifications Button */}
            <TouchableOpacity className="w-11 h-11 rounded-[14px] border-[1.5px] border-[#F2F2F2] bg-white items-center justify-center relative">
              <Notification size={20} color="#626262" />
              {/* Notification Dot */}
              <View className="absolute top-[10px] right-[10px] w-2.5 h-2.5 bg-[#EE8B3A] rounded-full border-[1.5px] border-white" />
            </TouchableOpacity>

            {/* Profile Button */}
            <TouchableOpacity className="w-11 h-11 rounded-[14px] overflow-hidden border-[1.5px] border-[#F2F2F2] bg-[#F4F4F4] items-center justify-center">
              <Text className="text-[14px] font-semibold text-[#555]">PS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dashboard Title Section */}
        {/* <Text className="text-[28px] font-semibold text-black tracking-tight">Dashboard</Text>
        <Text className="text-[13px] text-gray-500 mt-0.5">Welcome Philip stanton</Text> */}
      </View>
    </SafeAreaView>
  );
}
