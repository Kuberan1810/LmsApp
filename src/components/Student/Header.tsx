import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { NotificationBing, SearchNormal1 } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { ArrowLeft2 } from 'iconsax-react-native';

export interface HeaderProps {
  title?: string;
  onBackPress?: () => void;
  showSearch?: boolean;
  showNotification?: boolean;
  titleAlign?: 'left' | 'center';
}

export default function Header({ 
  title, 
  onBackPress,
  showSearch = true,
  showNotification = true,
  titleAlign = 'left'
}: HeaderProps = {}) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <View className="px-6 pt-4 pb-4 h-20 justify-center">
      <View className="flex-row items-center justify-between">

        {isSearchExpanded ? (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            className="flex-row items-center flex-1 bg-white rounded-2xl border-[1.5px] border-[#F2EEF4] px-4 h-12"
          >
            <SearchNormal1 size={18} color="#A0A0AB" />
            <TextInput
              placeholder="Search here..."
              className="flex-1 ml-2 font-medium text-[#1E1E2D]"
              placeholderTextColor="#A0A0AB"
              autoFocus
            />
            <TouchableOpacity onPress={() => setIsSearchExpanded(false)} className="p-1">
              <Ionicons name="close" size={20} color="#A0A0AB" />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            className="flex-row items-center justify-between flex-1 relative"
          >
            {/* Centered Title Layer */}
            {title && titleAlign === 'center' && (
              <View className="absolute inset-0 items-center justify-center pointer-events-none z-0 px-[60px]">
                <Text className="text-[22px] font-semibold text-[#333333] leading-tight text-center" numberOfLines={1}>
                  {title}
                </Text>
              </View>
            )}

            {/* Left: Title & Back OR Logo */}
            <View className="flex-row items-center flex-1 mr-4 z-10">
              {title ? (
                <>
                  {onBackPress && (
                    <TouchableOpacity 
                      onPress={onBackPress} 
                      className="mr-3 w-11 h-11 rounded-full items-center justify-center bg-[#FAFAFA] border border-[#F2EEF4]"
                    >
                      <ArrowLeft2 size={20} color="#333333" variant="Linear" />
                    </TouchableOpacity>
                  )}
                  {titleAlign === 'left' && (
                    <Text className="text-[22px] font-semibold text-[#333333] leading-tight flex-1" numberOfLines={1}>
                      {title}
                    </Text>
                  )}
                </>
              ) : (
                <View className="w-24 h-8 justify-center">
                  <Image
                    source={require('../../../assets/images/header-logo.svg')}
                    contentFit="contain"
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
              )}
            </View>

            {/* Right: Actions */}
            <View className="flex-row items-center gap-2.5">
              {/* Search Button */}
              {showSearch && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsSearchExpanded(true)}
                  className="w-11 h-11 rounded-[14px] border-[1.5px] border-[#F2EEF4] bg-white items-center justify-center"
                >
                  <SearchNormal1 size={18} color="#1E1E2D" />
                </TouchableOpacity>
              )}

              {/* Notifications Button */}
              {showNotification && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={()=> router.push("/(student)/notification/notifications")}
                  className="w-11 h-11 rounded-[14px] border-[1.5px] border-[#F2EEF4] bg-white items-center justify-center relative"
                >
                  <NotificationBing size={18} color="#1E1E2D" />
                  {/* Notification Dot */}
                  <View className="absolute top-[10px] right-[10px] w-2.5 h-2.5 bg-[#EE8B3A] rounded-full border-[1.5px] border-white" />
                </TouchableOpacity>
              )}

              {/* Profile Button */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push('/(student)/profile/profile')}
                className="w-11 h-11 rounded-[14px] border-[1.5px] border-[#F2EEF4] bg-[#F67300] items-center justify-center ml-1"
              >
                <Text className="text-[14px] font-bold text-white tracking-wider">PS</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

      </View>
    </View>
  );
}
