import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  const studentName = "lynx";
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return 'NA';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };
  const initials = getInitials(studentName);

  return (
    <View className="flex-1 bg-white">
      {/* Orange Background with Overlays */}
      <View className="pt-14 pb-32 px-5 relative">
        <View className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
          <Image
            source={require('../../../../assets/images/Rectangle 3342.svg')}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            contentFit="cover"
          />
          {/* Background bubbles */}
          <View className="absolute top-[244px] left-[-12px] w-[87px] h-[87px] bg-[#FF9E4A] rounded-full" />
          <View className="absolute top[-32px] left-[231px] w-32 h-32 bg-[#FF9E4A] rounded-full " />
          <View className="absolute bottom-10 -right-10 w-40 h-40 bg-[#FF9E4A] rounded-full" />
        </View>

        {/* Header */}
        <View className="flex-row items-center justify-between mb-6 z-10">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.push('/')}>
              <Feather name="chevron-left" size={24} color="#333333" />
            </TouchableOpacity>
            <Text className="text-[18px] font-semibold text-[#333333]">My Profile</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(student)/profile/settings' as any)}>
            <Feather name="settings" size={20} color="#333333" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View className="items-center z-10">
          <View className="relative">
            <View className="w-24 h-24 rounded-full border-4 border-white bg-[#FFE4CC] items-center justify-center">
              <Text className="text-[#F67300] text-[32px] font-bold">{initials}</Text>
            </View>
          </View>
          <Text className="text-[#333333] text-[18px] font-semibold mt-3">{studentName}</Text>
          <Text className="text-[#333333] text-[14px] mt-0.5 opacity-90">Student Id</Text>
          <Text className="text-[#333333] text-[12px] opacity-70">Student email</Text>
        </View>
      </View>

      {/* Main Content Area */}
      <View className="flex-1 bg-white rounded-t-[30px] -mt-10 px-5 pt-8">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

          {/* Top action buttons */}


          {/* Personal Details */}
          <View className="bg-[#FAFAFA] rounded-3xl p-5 mb-6 border border-[#F3F4F6]">
            <View className="flex-row items-center justify-between bg-[#F67300]/10 rounded-xl p-3 mb-5 h-[50px]">
              <View className="flex-row items-center gap-2">
                <Feather name="user" size={18} color="#F67300" />
                <Text className="text-[#F67300] font-medium text-[15px]">Personal Details</Text>
              </View>
            </View>

            <View className="gap-5 px-1">
              <View>
                <View className="flex-row items-center gap-2 mb-1">
                  <Feather name="mail" size={16} color="#F67300" />
                  <Text className="text-[#F67300] text-[13px] font-medium">Email:</Text>
                </View>
                <Text className="text-[#333333] text-[15px] ml-6 font-medium">testmail.com</Text>
              </View>

              <View>
                <View className="flex-row items-center gap-2 mb-1">
                  <Feather name="phone" size={16} color="#F67300" />
                  <Text className="text-[#F67300] text-[13px] font-medium">Phone:</Text>
                </View>
                <Text className="text-[#333333] text-[15px] ml-6 font-medium">+91 1234567890</Text>
              </View>



            </View>
          </View>

          {/* My Courses */}
          <View className="bg-[#FAFAFA] rounded-3xl p-5 border border-[#F3F4F6]">
            <View className="bg-[#F67300]/10 rounded-xl p-3 mb-5 h-[50px] justify-center">
              <Text className="text-[#F67300] font-medium text-[15px]">My Courses</Text>
            </View>

            <View className="gap-3">
              {[1, 2].map((item) => (
                <View key={item} className="flex-row items-center justify-between border border-[#F3F4F6] rounded-2xl p-4 bg-white">
                  <View className="items-center">
                    <Text className="text-[#333333] font-medium text-[12px] mb-2">Course ID</Text>
                    <Text className="text-[#6B7280] text-[10px]">AM101</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-[#333333] font-medium text-[12px] mb-2">Start Date</Text>
                    <Text className="text-[#6B7280] text-[10px]">12 , Dec 2025</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-[#333333] font-medium text-[12px] mb-2">Duration</Text>
                    <Text className="text-[#6B7280] text-[10px]">3 Months</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

        </ScrollView>
      </View>
    </View>
  );
}