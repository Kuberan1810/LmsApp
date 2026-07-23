import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface MeetHeaderProps {
  onLeaveCall: () => void;
  timeText: string;
  networkIcon: React.ReactNode;
  onCycleNetwork: () => void;
}

export default function MeetHeader({
  onLeaveCall,
  timeText,
  networkIcon,
  onCycleNetwork,
}: MeetHeaderProps) {
  return (
    <View className="pt-14 pb-3 px-5 z-20">
      <View className="bg-white/15 border border-white/10 rounded-3xl px-5 py-3.5 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={onLeaveCall}
          className="p-2 bg-white/15 border border-white/15 rounded-full w-8 h-8 justify-center items-center"
        >
          <ChevronLeft size={22} color="white" />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-white text-[16px] font-semibold tracking-tight">Development Team</Text>
          <Text className="text-white/60 text-[11px] font-medium mt-0.5">{timeText}</Text>
        </View>

        <TouchableOpacity
          className="w-8 h-8 justify-center items-end"
          onPress={onCycleNetwork}
        >
          {networkIcon}
        </TouchableOpacity>
      </View>
    </View>
  );
}
