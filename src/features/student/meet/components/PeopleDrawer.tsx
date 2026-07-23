import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, PanResponderInstance, LayoutAnimation, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, MicOff, Mic, Pin } from 'lucide-react-native';

interface Participant {
  id: string;
  name: string;
  initials: string;
  muted: boolean;
  avatarBg: string;
  handRaised: boolean;
}

interface PeopleDrawerProps {
  showParticipantsSheet: boolean;
  closeDrawer: () => void;
  drawerPanResponder: PanResponderInstance;
  drawerY: Animated.Value;
  DRAWER_FULL_HEIGHT: number;
  participants: Participant[];
  activeSpeakerId: string;
  setActiveSpeakerId: (id: string) => void;
  participantQuery: string;
  setParticipantQuery: (q: string) => void;
  filteredParticipants: Participant[];
}

export default function PeopleDrawer({
  showParticipantsSheet,
  closeDrawer,
  drawerPanResponder,
  drawerY,
  DRAWER_FULL_HEIGHT,
  participants,
  activeSpeakerId,
  setActiveSpeakerId,
  participantQuery,
  setParticipantQuery,
  filteredParticipants,
}: PeopleDrawerProps) {
  return (
    <View 
      className="absolute inset-0 z-[150]"
      pointerEvents={showParticipantsSheet ? 'auto' : 'none'}
    >
      {/* Backdrop — tap outside to close */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeDrawer}
        className="absolute inset-0 bg-black/55"
        style={{ opacity: showParticipantsSheet ? 1 : 0 }}
      />

      {/* Animated drawer panel */}
      <Animated.View
        {...drawerPanResponder.panHandlers}
        className="absolute bottom-0 inset-x-0 bg-[#14171C] rounded-t-[32px] border-t border-white/10 overflow-hidden"
        style={{
          height: DRAWER_FULL_HEIGHT,
          transform: [{ translateY: drawerY }],
        }}
      >
        <BlurView intensity={90} tint="dark" style={{ flex: 1 }}>
          {/* Header and drag handle wrapper */}
          <View>
            {/* Drag handle row */}
            <View className="items-center pt-4 pb-3">
              <View className="w-10 h-1 rounded-full bg-white/25" />
            </View>

            {/* Header */}
            <View className="flex-row items-center justify-between px-5 pb-4 border-b border-white/5">
              <View>
                <Text className="text-white font-bold text-base">People</Text>
                <Text className="text-[#A0A7B4] text-[11px] mt-0.5">{participants.length} in this call</Text>
              </View>
              <TouchableOpacity
                onPress={closeDrawer}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                className="w-8 h-8 rounded-full bg-white/10 items-center justify-center"
              >
                <X size={15} color="#A0A7B4" />
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Horizontal participant avatar scroll strip ── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16, gap: 12 }}
            className="border-b border-white/5 max-h-[120px]"
          >
            {participants.map((p) => (
              <TouchableOpacity
                key={p.id}
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setActiveSpeakerId(p.id);
                }}
                style={{ alignItems: 'center', width: 64, gap: 6 }}
              >
                {/* Avatar ring — orange if active speaker */}
                <View
                  className="w-[52px] h-[52px] rounded-full items-center justify-center border-2"
                  style={{
                    backgroundColor: p.avatarBg || '#2C2A30',
                    borderColor: activeSpeakerId === p.id ? '#FF7A00' : 'rgba(255,255,255,0.1)',
                  }}
                >
                  <Text className="text-white text-[15px] font-bold">{p.initials}</Text>
                  {/* Muted badge on avatar */}
                  {p.muted && (
                    <View className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-red-500 items-center justify-center border-[1.5px] border-[#14171C]">
                      <MicOff size={8} color="white" />
                    </View>
                  )}
                </View>
                <Text
                  className="text-[9px] font-semibold text-center mt-1.5"
                  style={{ color: activeSpeakerId === p.id ? '#FF7A00' : '#A0A7B4' }}
                  numberOfLines={1}
                >
                  {p.id === 'you' ? 'You' : p.name.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Search bar */}
          <View className="px-5 pt-3.5 pb-2">
            <TextInput
              value={participantQuery}
              onChangeText={setParticipantQuery}
              placeholder="Search people..."
              placeholderTextColor="#A0A7B4"
              className="h-[38px] bg-white/5 border border-white/10 rounded-xl px-3.5 text-white text-xs"
            />
          </View>

          {/* ── Vertical participant list ── */}
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20, gap: 8 }} showsVerticalScrollIndicator={false}>
            {filteredParticipants.map((p) => {
              const isSpotlighted = activeSpeakerId === p.id;
              return (
                <View
                  key={p.id}
                  className="flex-row items-center justify-between border rounded-2xl p-3"
                  style={{
                    backgroundColor: isSpotlighted ? 'rgba(255,122,0,0.07)' : 'rgba(255,255,255,0.03)',
                    borderColor: isSpotlighted ? 'rgba(255,122,0,0.2)' : 'rgba(255,255,255,0.05)',
                  }}
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className="w-[38px] h-[38px] rounded-full items-center justify-center"
                      style={{ backgroundColor: p.avatarBg || '#2C2A30' }}
                    >
                      <Text className="text-white text-[13px] font-bold">{p.initials}</Text>
                    </View>
                    <View>
                      <View className="flex-row items-center gap-1.5">
                        <Text className="text-white text-xs font-semibold">{p.name}</Text>
                        {p.id === 'you' && (
                          <View className="bg-white/10 px-1.5 py-0.5 rounded">
                            <Text className="text-white/50 text-[8px] font-bold uppercase">YOU</Text>
                          </View>
                        )}
                        {p.id === 'alison' && (
                          <View className="bg-[#FF7A00]/20 px-1.5 py-0.5 rounded">
                            <Text className="text-[#FF7A00] text-[8px] font-bold uppercase">HOST</Text>
                          </View>
                        )}
                      </View>
                      <Text className="text-[#A0A7B4] text-[10px] mt-0.5">{p.id === 'alison' ? 'Instructor' : 'Student'}</Text>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-2">
                    {/* Spotlight pin */}
                    <TouchableOpacity
                      onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setActiveSpeakerId(p.id);
                      }}
                      style={{
                        width: 32, height: 32, borderRadius: 10,
                        backgroundColor: isSpotlighted ? 'rgba(255,122,0,0.2)' : 'rgba(255,255,255,0.06)',
                        borderWidth: 1,
                        borderColor: isSpotlighted ? 'rgba(255,122,0,0.3)' : 'transparent',
                        alignItems: 'center', justifyContent: 'center'
                      }}
                    >
                      <Pin size={12} color={isSpotlighted ? '#FF7A00' : '#A0A7B4'} />
                    </TouchableOpacity>
                    {/* Mic status */}
                    <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center', justifyContent: 'center' }}>
                      {p.muted
                        ? <MicOff size={12} color="#EF4444" />
                        : <Mic size={12} color="#22C55E" />}
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </BlurView>
      </Animated.View>
    </View>
  );
}
