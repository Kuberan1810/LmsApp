import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function DashboardHeader() {
  const router = useRouter();
  
  return (
    <View className="px-5 pt-4 pb-2">
      {/* Top Navigation Row */}
      <View className="flex-row items-center justify-between mb-8">
        {/* Logo */}
        <View className="w-24 h-8 justify-center">
          <Image 
            source={require('../../../../assets/images/header-logo.svg')} 
            contentFit="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        {/* Search Bar */}
        <View className="flex-1 mx-4 flex-row items-center bg-white border border-gray-100 rounded-xl px-3 h-10 shadow-sm">
          <Feather name="search" size={16} color="#A0A0A0" />
          <TextInput 
            className="flex-1 ml-2 text-[13px] text-black"
            placeholder="Search courses, assignments..."
            placeholderTextColor="#A0A0A0"
          />
        </View>

        {/* Notifications and Profile */}
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4 relative">
            <Feather name="bell" size={20} color="#555" />
            {/* Notification Dot */}
            <View className="absolute top-0 right-0 w-2 h-2 bg-[#EE8B3A] rounded-full border border-white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => router.push('/(student)/profile/profile' as any)}
            className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-gray-100 items-center justify-center"
          >
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} 
              contentFit="cover"
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dashboard Title Section */}
      <Text className="text-[28px] font-semibold text-black tracking-tight">Dashboard</Text>
      <Text className="text-[13px] text-gray-500 mt-0.5">Welcome Philip stanton</Text>
    </View>
  );
}
