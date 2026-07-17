import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onBackPress?: () => void;
  showSearchAndNotify?: boolean;
  profileSource?: ImageSourcePropType;
}

export default function Header({
  title = 'Assignments',
  subtitle = 'Track your coursework and upcoming deadlines.',
  onBackPress,
  showSearchAndNotify = false,
  profileSource = require('../../../../assets/images/avatarLms.png'),
}: HeaderProps) {
  return (
    <View className="px-5 pt-3 pb-2 flex-row justify-between items-start">
      <View className="flex-row items-start flex-1 mr-4">
        {onBackPress && (
          <TouchableOpacity onPress={onBackPress} className="mt-1 mr-1.5 p-1 rounded-lg">
            <Ionicons name="chevron-back" size={26} color="#1F2937" />
          </TouchableOpacity>
        )}
        <View className="flex-1">
          <Text className="text-[20px] font-medium text-[#333333] leading-tight">{title}</Text>
          <Text className="text-[#626262] text-[12px] mt-0.5 leading-normal">
            {subtitle}
          </Text>
        </View>
      </View>

      {/* Right Content */}
      <View className="flex-row items-center gap-[10px] mt-1">
        {showSearchAndNotify && (
          <>
            {/* Search Button */}
            <TouchableOpacity className="w-[30px] h-[30px] rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] items-center justify-center">
              <Feather name="search" size={14} color="black" />
            </TouchableOpacity>

            {/* Notification Bell Button */}
            <TouchableOpacity className="w-[30px] h-[30px] rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] items-center justify-center relative">
              <View className="absolute top-[6px] right-[8px] w-1.5 h-1.5 bg-[#F67300] rounded-full z-10" />
              <Ionicons name="notifications-outline" size={14} color="black" />
            </TouchableOpacity>
          </>
        )}

        {/* Profile Avatar */}
        <View className="w-[30px] h-[30px] rounded-lg overflow-hidden border border-[#E5E5E5]">
          <Image
            source={profileSource}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
}
