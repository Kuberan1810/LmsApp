import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NotificationsScreen() {
  const router = useRouter();
  const [allRead, setAllRead] = useState(false);

  const handleMarkAllAsRead = () => {
    setAllRead(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      {/* Header */}
      <View className="px-5 pt-4 pb-4 flex-row items-center justify-between border-b border-[#F3F4F6] mb-4">
        <View className="flex-row items-center gap-2">
          <Text className="text-[22px] font-medium text-[#333333]">Notifications</Text>
          {!allRead && (
            <View className="bg-[#F67300] w-[22px] h-[22px] rounded-full items-center justify-center">
              <Text className="text-white text-[12px] font-bold">3</Text>
            </View>
          )}
        </View>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity onPress={handleMarkAllAsRead}>
            <Text className="text-[#F67300] text-[13px] font-medium">Mark all as read</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.push('/')} className="p-1">
            <Feather name="x" size={16} color="#333333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        
        {/* Today Section */}
        <Text className="text-[#F67300] text-[15px] font-medium mb-3">Today</Text>

        {/* Card 1 */}
        <View className="bg-white rounded-2xl p-4 mb-3 flex-row items-start shadow-sm shadow-gray-100 border border-gray-50">
          <View className="w-[42px] h-[42px] rounded-xl bg-[#FFF3E8] items-center justify-center mr-3">
            <Feather name="clock" size={20} color="#F67300" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-[15px] font-medium text-[#333333]">Schedule Reminder</Text>
              <View className="flex-row items-center">
                <Text className="text-[11px] text-[#6B7280] mr-1.5">15 mins ago</Text>
                {!allRead && <View className="w-1.5 h-1.5 rounded-full bg-[#F67300]" />}
              </View>
            </View>
            <Text className="text-[13px] text-[#6B7280]">
              Upcoming class : <Text className="font-semibold text-[#333333]">AI agent</Text> starts in 15 mins
            </Text>
          </View>
        </View>

        {/* Card 2 */}
        <View className="bg-white rounded-2xl p-4 mb-6 flex-row items-start shadow-sm shadow-gray-100 border border-gray-50">
          <View className="w-[42px] h-[42px] rounded-xl bg-[#FFF3E8] items-center justify-center mr-3">
            <Ionicons name="school-outline" size={22} color="#F67300" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-[15px] font-medium text-[#333333]">Test Score</Text>
              <View className="flex-row items-center">
                <Text className="text-[11px] text-[#6B7280] mr-1.5">25 mins ago</Text>
                {!allRead && <View className="w-[1.5px] h-[1.5px] rounded-full bg-[#F67300] scale-[3] ml-1" />}
              </View>
            </View>
            <Text className="text-[13px] text-[#6B7280]">
              Final grades for <Text className="font-semibold text-[#333333]">test name</Text> have been posted
            </Text>
          </View>
        </View>

        {/* Yesterday Section */}
        <Text className="text-[#F67300] text-[15px] font-medium mb-3">Yesterday</Text>

        {/* Card 3 */}
        <View className="bg-white rounded-2xl p-4 mb-3 flex-row items-start shadow-sm shadow-gray-100 border border-gray-50">
          <View className="w-[42px] h-[42px] rounded-xl bg-[#E8F5E9] items-center justify-center mr-3">
            <View className="bg-[#10B981] rounded-full w-[22px] h-[22px] items-center justify-center">
              <Feather name="check" size={14} color="white" />
            </View>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-[15px] font-medium text-[#333333]">System Alert</Text>
              <View className="flex-row items-center">
                <Text className="text-[11px] text-[#6B7280] mr-1.5">Yesterday</Text>
                {!allRead && <View className="w-[1.5px] h-[1.5px] rounded-full bg-[#F67300] scale-[3] ml-1" />}
              </View>
            </View>
            <Text className="text-[13px] text-[#333333] leading-relaxed">
              Your Test submission for <Text className="font-semibold text-[#333333]">test name</Text> was successful
            </Text>
          </View>
        </View>

        {/* Card 4 */}
        <View className="bg-white rounded-2xl p-4 mb-3 flex-row items-start shadow-sm shadow-gray-100 border border-gray-50">
          <View className="w-[42px] h-[42px] rounded-xl bg-[#F3F4F6] items-center justify-center mr-3">
            <Feather name="clock" size={20} color="#6B7280" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-[15px] font-medium text-[#6B7280]">Schedule Reminder</Text>
              <View className="flex-row items-center">
                <Text className="text-[11px] text-[#9CA3AF] mr-2">Yesterday</Text>
              </View>
            </View>
            <Text className="text-[13px] text-[#9CA3AF]">
              Upcoming class : <Text className="font-semibold">AI agent</Text> starts in 15 mins
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
