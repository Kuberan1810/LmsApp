import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, LayoutAnimation, PanResponder, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Maximize2, Minimize2, MicOff, Hand } from 'lucide-react-native';

interface Participant {
  id: string;
  name: string;
  initials: string;
  muted: boolean;
  avatarBg: string;
  handRaised: boolean;
}

interface ParticipantGridProps {
  isSpotlightFullscreen: boolean;
  setIsSpotlightFullscreen: (full: boolean) => void;
  isControlsHidden: boolean;
  toggleControls: () => void;
  spotlightParticipant: Participant;
  participantChunks: Participant[][];
  SCREEN_WIDTH: number;
  openDrawer: () => void;
  currentGridPage: number;
  setCurrentGridPage: (page: number) => void;
}

export default function ParticipantGrid({
  isSpotlightFullscreen,
  setIsSpotlightFullscreen,
  isControlsHidden,
  toggleControls,
  spotlightParticipant,
  participantChunks,
  SCREEN_WIDTH,
  openDrawer,
  currentGridPage,
  setCurrentGridPage,
}: ParticipantGridProps) {
  // Quick-activation pan responder for the swipe handle
  const swipePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Quick activation: instantly open if they drag up just 15px!
        if (gestureState.dy < -15) {
          openDrawer();
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Handle a simple tap as well
        if (Math.abs(gestureState.dy) < 5 && Math.abs(gestureState.dx) < 5) {
          openDrawer(); 
        }
      }
    })
  ).current;

  const insets = useSafeAreaInsets();

  return (
    <View 
      className="flex-1 justify-center"
      style={{
        paddingTop: (isSpotlightFullscreen || isControlsHidden) ? Math.max(insets.top, 24) : 8,
        paddingBottom: (isSpotlightFullscreen || isControlsHidden) ? Math.max(insets.bottom, 24) : 8,
      }}
    >
      {/* Absolute Background Pressable for Immersive Mode Toggle */}
      <TouchableOpacity 
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} 
        activeOpacity={1}
        onPress={toggleControls}
      />

      {/* Main Active Speaker Card */}
      <View 
        className="px-5"
        style={{ 
          flex: (isSpotlightFullscreen || isControlsHidden) ? 1 : undefined, 
          marginBottom: 24 
        }}
        pointerEvents="box-none"
      >
        <View
          className="border-[#98D8A0] border-2 rounded-3xl overflow-hidden bg-[#1C2128] items-center justify-center relative"
          style={{ 
            flex: (isSpotlightFullscreen || isControlsHidden) ? 1 : undefined,
            height: (isSpotlightFullscreen || isControlsHidden) ? undefined : 220 
          }}
        >
          {/* Initials Text Card Circle */}
          <View
            className="w-20 h-20 rounded-full border-2 border-white/15 items-center justify-center shadow-black shadow-md"
            style={{
              backgroundColor: spotlightParticipant.avatarBg || '#2C2A30',
              elevation: 4,
            }}
          >
            <Text className="text-white text-[28px] font-bold tracking-wide">
              {spotlightParticipant.initials}
            </Text>
          </View>

          {/* Speaker Active Pulse Waveform */}
          {!spotlightParticipant.muted && (
            <View
              className="absolute w-[100px] h-[100px] rounded-full border-[1.5px] border-[#98D8A0]/40 -z-10 animate-ping"
            />
          )}

          {/* Fullscreen Button Overlay on top-right of active video */}
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setIsSpotlightFullscreen(!isSpotlightFullscreen);
            }}
            className="absolute bottom-4 right-4 z-30 w-8 h-8 rounded-xl bg-black/55 border border-white/5 items-center justify-center"
          >
            {isSpotlightFullscreen ? (
              <Minimize2 size={14} color="white" />
            ) : (
              <Maximize2 size={14} color="white" />
            )}
          </TouchableOpacity>

          {/* Mute Indicator overlay top-left if muted */}
          {spotlightParticipant.muted && (
            <View className="absolute top-4 left-4 w-8 h-8 rounded-xl bg-black/55 border border-white/5 items-center justify-center">
              <MicOff size={14} color="#EF4444" />
            </View>
          )}
        </View>

        {/* Name label below card */}
        <Text className="text-white text-xs font-semibold mt-2.5 ml-2">
          {spotlightParticipant.name} {isSpotlightFullscreen && '(Fullscreen Spotlight Mode)'}
        </Text>
      </View>

      {/* 2x2 Grid of Participants - Hide only in true Spotlight Fullscreen */}
      {!isSpotlightFullscreen && (
        <View pointerEvents="box-none">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={{ marginTop: 4, width: SCREEN_WIDTH }}
            snapToInterval={SCREEN_WIDTH}
            snapToAlignment="center"
            decelerationRate="normal"
            disableIntervalMomentum={true}
            onMomentumScrollEnd={(e) => {
              const page = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
              setCurrentGridPage(page);
            }}
          >
            {participantChunks.map((chunk, pageIndex) => (
              <View 
                key={pageIndex} 
                className="flex-row flex-wrap justify-between px-5" 
                style={{ width: SCREEN_WIDTH }}
              >
                {chunk.map((participant) => (
                  <View
                    key={participant.id}
                    style={{
                      width: (SCREEN_WIDTH - 52) / 2,
                      marginBottom: 16,
                    }}
                  >
                    <View
                      className="h-[135px] bg-[#1C2128] rounded-[20px] border border-white/[0.04] overflow-hidden relative justify-center items-center"
                    >
                      {/* Circular Initials Avatar Placeholder */}
                      <View
                        className="w-14 h-14 rounded-full border-[1.5px] border-white/10 items-center justify-center"
                        style={{
                          backgroundColor: participant.avatarBg || '#2C2A30',
                        }}
                      >
                        <Text className="text-white text-lg font-semibold">
                          {participant.initials}
                        </Text>
                      </View>

                      {/* Mute Indicator overlay top-left */}
                      {participant.muted && (
                        <View className="absolute top-3 left-3 w-6 h-6 rounded-lg bg-black/40 items-center justify-center">
                          <MicOff size={11} color="white" />
                        </View>
                      )}

                      {/* Hand Raise Badge */}
                      {participant.handRaised && (
                        <View className="absolute top-3 right-3 w-6 h-6 rounded-lg bg-yellow-500/20 items-center justify-center border border-yellow-500/30">
                          <Hand size={11} color="#F59E0B" />
                        </View>
                      )}
                    </View>

                    {/* Name Label below the card */}
                    <Text className="text-white text-[11px] font-semibold mt-2 ml-2" numberOfLines={1}>
                      {participant.name}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          {participantChunks.length > 1 && (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 4 }}>
              {participantChunks.map((_, i) => (
                <View 
                  key={i} 
                  style={{ 
                    width: i === currentGridPage ? 14 : 6, 
                    height: 6, 
                    borderRadius: 3, 
                    backgroundColor: i === currentGridPage ? '#FF7A00' : 'rgba(255,255,255,0.2)',
                  }} 
                />
              ))}
            </View>
          )}

          {/* Swipe handle indicator */}
          <View
            {...swipePanResponder.panHandlers}
           className='items-center mt-7'
            hitSlop={{ top: 20, bottom: 20, left: 100, right: 100 }}
          >
            <View className="w-12 h-1 bg-white/5 rounded-full" />
            <Text className="text-white/20 text-[8px] mt-2 uppercase font-semibold tracking-wider">Swipe up to view all participants</Text>
          </View>
        </View>
      )}
    </View>
  );
}
