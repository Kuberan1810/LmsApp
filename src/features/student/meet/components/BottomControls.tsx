import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Video, VideoOff, Mic, MicOff, Smile, PhoneOff, MoreHorizontal } from 'lucide-react-native';

interface BottomControlsProps {
  camActive: boolean;
  toggleUserCam: () => void;
  micActive: boolean;
  toggleUserMic: () => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (show: boolean) => void;
  openMoreOptions: () => void;
  setShowMoreOptions: (show: boolean) => void;
  handleLeaveCall: () => void;
}

export default function BottomControls({
  camActive,
  toggleUserCam,
  micActive,
  toggleUserMic,
  showEmojiPicker,
  setShowEmojiPicker,
  openMoreOptions,
  setShowMoreOptions,
  handleLeaveCall,
}: BottomControlsProps) {
  return (
    <View className="pb-7 pt-3 px-5">
      <View
        className="bg-[#1C2128] rounded-full flex-row items-center justify-between px-2.5 py-2.5 border border-white/5"
      >
        {/* Camera toggle */}
        <TouchableOpacity
          onPress={toggleUserCam}
          className="w-[52px] h-[52px] rounded-full items-center justify-center"
          style={{ backgroundColor: camActive ? 'rgba(255,255,255,0.08)' : 'rgba(239,68,68,0.15)' }}
        >
          {camActive ? <Video size={22} color="white" /> : <VideoOff size={22} color="#EF4444" />}
        </TouchableOpacity>

        {/* Mic toggle */}
        <TouchableOpacity
          onPress={toggleUserMic}
          className="w-[52px] h-[52px] rounded-full items-center justify-center"
          style={{ backgroundColor: micActive ? 'rgba(255,255,255,0.08)' : 'rgba(239,68,68,0.15)' }}
        >
          {micActive ? <Mic size={22} color="white" /> : <MicOff size={22} color="white" />}
        </TouchableOpacity>

        {/* Emoji reactions */}
        <TouchableOpacity
          onPress={() => setShowEmojiPicker(!showEmojiPicker)}
          className="w-[52px] h-[52px] rounded-full items-center justify-center"
          style={{ backgroundColor: showEmojiPicker ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)' }}
        >
          <Smile size={22} color={showEmojiPicker ? '#FF7A00' : 'white'} />
        </TouchableOpacity>

        {/* More options ⋯ */}
        <TouchableOpacity
          onPress={openMoreOptions}
          className="w-[52px] h-[52px] rounded-full bg-white/10 items-center justify-center"
        >
          <MoreHorizontal size={22} color="white" />
        </TouchableOpacity>

        {/* Leave Call Button */}
        <TouchableOpacity
          onPress={handleLeaveCall}
          className="h-[52px] rounded-full bg-red-500/20 flex-row items-center justify-center px-5 gap-1.5"
        >
          <PhoneOff size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
