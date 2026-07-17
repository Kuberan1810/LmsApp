import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomSwitch = ({ value, onValueChange }: { value: boolean, onValueChange: (val: boolean) => void }) => {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22]
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E2E8F0', '#F67300']
  });

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
    >
      <Animated.View style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        backgroundColor,
        justifyContent: 'center',
      }}>
        <Animated.View 
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            transform: [{ translateX }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
            elevation: 2,
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const studentName = "lynx";
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return 'NA';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };
  const initials = getInitials(studentName);

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <View className="flex-1 px-5 pt-2">
        {/* Header */}
        <View className="flex-row items-center mb-8 mt-2">
          <TouchableOpacity onPress={() => router.back()} className="mr-3 p-1 -ml-1">
            <Feather name="chevron-left" size={24} color="#333333" />
          </TouchableOpacity>
          <Text className="text-[18px] font-medium text-[#333333]">Settings</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Profile Quick Info */}
          <View className="flex-row items-center mb-10">
            <View className="relative mr-4">
              <View className="w-[60px] h-[60px] rounded-full border-2 border-white bg-[#FFE4CC] items-center justify-center shadow-sm">
                <Text className="text-[#F67300] text-[20px] font-bold">{initials}</Text>
              </View>
              <View className="absolute bottom-0 right-0 w-[14px] h-[14px] bg-[#10B981] border-[2.5px] border-white rounded-full z-10" />
            </View>
            <View>
              <Text className="text-[16px] font-medium text-[#333333]">{studentName}</Text>
              <Text className="text-[13px] text-[#6B7280] mt-0.5">Student Id</Text>
            </View>
          </View>

          {/* Notifications Section */}
          <Text className="text-[20px] font-medium text-[#64748B] mb-3">Notifications</Text>
          <View className="bg-white rounded-xl border border-[#F1F5F9] mb-8 shadow-sm shadow-gray-100">
            <View className="flex-row items-center justify-between p-4 border-b border-[#F1F5F9]">
              <View className="flex-row items-center">
                <Feather name="bell" size={18} color="#333333" />
                <Text className="text-[14px] text-[#333333] ml-3">Push Notification</Text>
              </View>
              <CustomSwitch 
                value={pushEnabled} 
                onValueChange={setPushEnabled}
              />
            </View>
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <Feather name="mail" size={18} color="#333333" />
                <Text className="text-[14px] text-[#333333] ml-3">Email Notification</Text>
              </View>
              <CustomSwitch 
                value={emailEnabled} 
                onValueChange={setEmailEnabled}
              />
            </View>
          </View>

          {/* Support & Legal Section */}
          <Text className="text-[20px] font-medium text-[#64748B] mb-3">Support & Legal</Text>
          <View className="bg-white rounded-xl border border-[#F1F5F9] mb-12 shadow-sm shadow-gray-100">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-[#F1F5F9]">
              <View className="flex-row items-center">
                <Feather name="help-circle" size={18} color="#333333" />
                <Text className="text-[14px] text-[#333333] ml-3">Help Center</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-[#F1F5F9]">
              <View className="flex-row items-center">
                <Feather name="headphones" size={18} color="#333333" />
                <Text className="text-[14px] text-[#333333] ml-3">Terms of Service</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <Feather name="shield" size={18} color="#333333" />
                <Text className="text-[14px] text-[#333333] ml-3">Privacy Policy</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Log Out Button */}
          <View className="items-center">
            <TouchableOpacity className="flex-row items-center justify-center border border-[#F67300] rounded-lg py-2.5 px-6">
              <Feather name="log-out" size={16} color="#F67300" style={{ transform: [{ scaleX: -1 }] }} />
              <Text className="text-[#F67300] font-medium ml-2">Log Out</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
