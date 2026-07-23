import React from 'react';
import { View, Text, TouchableOpacity, Animated, PanResponderInstance } from 'react-native';
import { Hand, Monitor, MonitorOff, Sparkles, Volume2, Users, MessageSquare, Download, HelpCircle, PhoneOff } from 'lucide-react-native';

interface MoreOptionsSheetProps {
  showMoreOptions: boolean;
  closeMoreOptions: () => void;
  moreOptionsPanResponder: PanResponderInstance;
  moreOptionsY: Animated.Value;
  handRaised: boolean;
  setHandRaised: (raised: boolean) => void;
  screenShareActive: boolean;
  setScreenShareActive: (active: boolean) => void;
  speakerActive: boolean;
  setSpeakerActive: (active: boolean) => void;
  activePanel: 'chat' | 'tutor' | 'resources' | 'polls' | null;
  togglePanel: (panel: 'chat' | 'tutor' | 'resources' | 'polls') => void;
  openDrawer: () => void;
  handleLeaveCall: () => void;
}

export default function MoreOptionsSheet({
  showMoreOptions,
  closeMoreOptions,
  moreOptionsPanResponder,
  moreOptionsY,
  handRaised,
  setHandRaised,
  screenShareActive,
  setScreenShareActive,
  speakerActive,
  setSpeakerActive,
  activePanel,
  togglePanel,
  openDrawer,
  handleLeaveCall,
}: MoreOptionsSheetProps) {
  if (!showMoreOptions) return null;

  return (
    <>
      {/* Backdrop */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeMoreOptions}
        className="absolute inset-0 bg-black/50 z-[195]"
      />
      <Animated.View
        {...moreOptionsPanResponder.panHandlers}
        className="absolute bottom-0 inset-x-0 bg-[#202124] rounded-t-[28px] z-[200] pb-7 px-4 pt-3"
        style={{
          transform: [{ translateY: moreOptionsY }],
        }}
      >
        {/* Drag handle */}
        <View className="items-center mb-5 pt-3 pb-4">
          <View className="w-9 h-1 rounded-full bg-white/25" />
        </View>

        {/* ── ROW 1: Full-width Raise Hand pill ── */}
        <TouchableOpacity
          onPress={() => { setHandRaised(!handRaised); closeMoreOptions(); }}
          className="rounded-[18px] h-[72px] items-center justify-center mb-2.5"
          style={{ backgroundColor: handRaised ? 'rgba(246,187,66,0.25)' : '#303134' }}
        >
          <Hand size={26} color={handRaised ? '#F6BB42' : 'white'} />
          {handRaised && (
            <Text className="text-[#F6BB42] text-[10px] font-semibold mt-1">Lower hand</Text>
          )}
        </TouchableOpacity>

        {/* ── ROW 2: 3 equal icon-only square buttons ── */}
        <View className="flex-row gap-2.5 mb-2.5">
          {/* Share Screen */}
          <TouchableOpacity
            onPress={() => { setScreenShareActive(!screenShareActive); closeMoreOptions(); }}
            className="flex-1 rounded-[18px] h-[72px] items-center justify-center"
            style={{ backgroundColor: screenShareActive ? 'rgba(59,175,218,0.3)' : '#303134' }}
          >
            {screenShareActive ? <MonitorOff size={26} color="#3BAFDA" /> : <Monitor size={26} color="white" />}
          </TouchableOpacity>

          {/* Captions / AI Copilot */}
          <TouchableOpacity
            onPress={() => { togglePanel('tutor'); closeMoreOptions(); }}
            className="flex-1 rounded-[18px] h-[72px] items-center justify-center"
            style={{ backgroundColor: activePanel === 'tutor' ? 'rgba(255,122,0,0.25)' : '#303134' }}
          >
            <Sparkles size={26} color={activePanel === 'tutor' ? '#FF7A00' : 'white'} />
          </TouchableOpacity>

          {/* Audio Output */}
          <TouchableOpacity
            onPress={() => { setSpeakerActive(!speakerActive); closeMoreOptions(); }}
            className="flex-1 rounded-[18px] h-[72px] items-center justify-center"
            style={{ backgroundColor: speakerActive ? 'rgba(200,210,230,0.18)' : '#303134' }}
          >
            <Volume2 size={26} color="white" />
          </TouchableOpacity>
        </View>

        {/* ── ROW 3: 2 wide labeled buttons ── */}
        <View className="flex-row gap-2.5 mb-2.5">
          {/* People */}
          <TouchableOpacity
            onPress={() => { closeMoreOptions(); openDrawer(); }}
            className="flex-1 bg-[#303134] rounded-[18px] h-16 flex-row items-center justify-center gap-2.5"
          >
            <Users size={22} color="white" />
            <Text className="text-white text-[14px] font-medium">People</Text>
          </TouchableOpacity>

          {/* Chat */}
          <TouchableOpacity
            onPress={() => { togglePanel('chat'); closeMoreOptions(); }}
            className="flex-1 rounded-[18px] h-16 flex-row items-center justify-center gap-2.5"
            style={{ backgroundColor: activePanel === 'chat' ? 'rgba(255,122,0,0.2)' : '#303134' }}
          >
            <MessageSquare size={22} color={activePanel === 'chat' ? '#FF7A00' : 'white'} />
            <Text className="text-[14px] font-medium" style={{ color: activePanel === 'chat' ? '#FF7A00' : 'white' }}>Chat</Text>
          </TouchableOpacity>
        </View>

        {/* ── ROW 4: 3 small icon + text-below buttons ── */}
        <View className="flex-row gap-2.5">
          {/* Resources */}
          <TouchableOpacity
            onPress={() => { togglePanel('resources'); closeMoreOptions(); }}
            className="flex-1 bg-[#303134] rounded-[18px] py-4 items-center gap-1.5"
          >
            <Download size={20} color="white" />
            <Text className="text-white text-[11px] font-medium">Resources</Text>
          </TouchableOpacity>

          {/* Poll (Tools) */}
          <TouchableOpacity
            onPress={() => { togglePanel('polls'); closeMoreOptions(); }}
            className="flex-1 bg-[#303134] rounded-[18px] py-4 items-center gap-1.5"
          >
            <HelpCircle size={20} color="white" />
            <Text className="text-white text-[11px] font-medium">Live Poll</Text>
          </TouchableOpacity>

          {/* Leave */}
          <TouchableOpacity
            onPress={handleLeaveCall}
            className="flex-1 bg-red-500/15 rounded-[18px] py-4 items-center gap-1.5"
          >
            <PhoneOff size={20} color="#EF4444" />
            <Text className="text-[#EF4444] text-[11px] font-medium">Leave</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}
