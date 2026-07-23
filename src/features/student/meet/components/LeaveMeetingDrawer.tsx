import React from 'react';
import { View, Text, TouchableOpacity, Animated, PanResponderInstance } from 'react-native';
import { PhoneOff } from 'lucide-react-native';
import { router } from 'expo-router';

interface LeaveMeetingDrawerProps {
  showLeaveDrawer: boolean;
  closeLeaveDrawer: () => void;
  leaveDrawerPanResponder: PanResponderInstance;
  leaveDrawerY: Animated.Value;
}

export default function LeaveMeetingDrawer({
  showLeaveDrawer,
  closeLeaveDrawer,
  leaveDrawerPanResponder,
  leaveDrawerY,
}: LeaveMeetingDrawerProps) {
  if (!showLeaveDrawer) return null;

  return (
    <>
      {/* Backdrop */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeLeaveDrawer}
        className="absolute inset-0 bg-black/50 z-[210]"
      />
      <Animated.View
        {...leaveDrawerPanResponder.panHandlers}
        className="absolute bottom-0 inset-x-0 bg-[#1C2128] rounded-t-[32px] z-[220] pb-10 px-6 pt-3 border-t border-white/5"
        style={{
          transform: [{ translateY: leaveDrawerY }],
        }}
      >
        {/* Drag handle */}
        <View className="items-center mb-6 pt-3 pb-2">
          <View className="w-10 h-1.5 rounded-full bg-white/20" />
        </View>

        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-full bg-red-500/10 items-center justify-center mb-4">
            <PhoneOff size={28} color="#EF4444" />
          </View>
          <Text className="text-white text-xl font-bold mb-2">Leave Meeting?</Text>
          <Text className="text-[#A0A7B4] text-[13px] text-center px-4">
            Are you sure you want to leave the live class? You can always rejoin if the class is still active.
          </Text>
        </View>

        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={closeLeaveDrawer}
            className="flex-1 h-14 bg-white/5 rounded-2xl items-center justify-center border border-white/10"
          >
            <Text className="text-white font-semibold">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              closeLeaveDrawer();
              router.back();
            }}
            className="flex-1 h-14 bg-[#EF4444] rounded-2xl items-center justify-center"
          >
            <Text className="text-white font-bold">Leave Class</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}
