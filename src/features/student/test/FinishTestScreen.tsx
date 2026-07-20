import { View, Text, TouchableOpacity, ScrollView, StatusBar, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Clock } from 'iconsax-react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, G } from 'react-native-svg';
import Animated, { useSharedValue, withTiming, useAnimatedProps, Easing } from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function FinishTestScreen() {
  const [timeLeft, setTimeLeft] = useState(58 * 60 + 10); // 58:10

  // Format time (e.g. 58:10)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  // Prevent back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  // --- Donut Chart Animation ---
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { 
      duration: 1500, 
      easing: Easing.out(Easing.cubic) 
    });
  }, []);

  const radius = 56;
  const strokeWidth = 14;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * radius;

  // Values
  const total = 10;
  const answered = 2;
  const marked = 2;
  const notAnswered = 6;

  const answeredPct = answered / total;
  const markedPct = marked / total;
  const notAnsweredPct = notAnswered / total;

  const gap = 8; 
  const getDash = (pct: number) => Math.max(0, (pct * circumference) - gap);

  const answeredLength = getDash(answeredPct);
  const markedLength = getDash(markedPct);
  const notAnsweredLength = getDash(notAnsweredPct);

  const answeredOffset = 0;
  const markedOffset = -(answeredPct * circumference);
  const notAnsweredOffset = -((answeredPct + markedPct) * circumference);

  const answeredAnimatedProps = useAnimatedProps(() => ({
    strokeDasharray: `${progress.value * answeredLength} ${circumference}`
  }));
  const markedAnimatedProps = useAnimatedProps(() => ({
    strokeDasharray: `${progress.value * markedLength} ${circumference}`
  }));
  const notAnsweredAnimatedProps = useAnimatedProps(() => ({
    strokeDasharray: `${progress.value * notAnsweredLength} ${circumference}`
  }));

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />

      {/* ── HEADER ── */}
      <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-[#F2EEF4]">
        <Text className="text-[20px] font-semibold text-[#1E1E2D]">Finish Test</Text>
        <View className="flex-row items-center gap-1.5">
          <Clock size={16} color="#666" />
          <Text className="text-[14px] text-[#666]">Remaining time {formatTime(timeLeft)}</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── SUMMARY CARD ── */}
        <View className="bg-white rounded-[24px] p-6 border border-[#F2EEF4] mb-6 shadow-sm">
          
          {/* Animated Donut Chart */}
          <View className="items-center mb-8 relative">
            <View className="w-[140px] h-[140px] items-center justify-center">
              <Svg width="140" height="140" viewBox="0 0 140 140">
                <G rotation="-90" origin={`${cx}, ${cy}`}>
                  {/* Track */}
                  <Circle cx={cx} cy={cy} r={radius} stroke="#F5F5F5" strokeWidth={strokeWidth} fill="transparent" />
                  
                  {/* Not Answered */}
                  <AnimatedCircle
                    cx={cx} cy={cy} r={radius} stroke="#E61026" strokeWidth={strokeWidth} fill="transparent"
                    strokeLinecap="round" strokeDashoffset={notAnsweredOffset} animatedProps={notAnsweredAnimatedProps}
                  />
                  {/* Marked */}
                  <AnimatedCircle
                    cx={cx} cy={cy} r={radius} stroke="#FFB020" strokeWidth={strokeWidth} fill="transparent"
                    strokeLinecap="round" strokeDashoffset={markedOffset} animatedProps={markedAnimatedProps}
                  />
                  {/* Answered */}
                  <AnimatedCircle
                    cx={cx} cy={cy} r={radius} stroke="#1DD75B" strokeWidth={strokeWidth} fill="transparent"
                    strokeLinecap="round" strokeDashoffset={answeredOffset} animatedProps={answeredAnimatedProps}
                  />
                </G>
              </Svg>
              <View className="absolute inset-0 items-center justify-center">
                <Text className="text-[32px] font-bold text-[#333] leading-[38px]">{total}</Text>
                <Text className="text-[11px] font-semibold tracking-[1px] text-[#888]">TOTAL</Text>
              </View>
            </View>
          </View>

          {/* Texts */}
          <Text className="text-[18px] font-semibold text-[#1E1E2D] mb-1 text-center">Your Test Summary</Text>
          <Text className="text-[13px] text-[#666] mb-6 text-center">Breakdown of your responses in New Test</Text>

          {/* Breakdown Rows */}
          <View className="gap-3">
            {/* Answered */}
            <View className="flex-row justify-between items-center bg-white border border-[#F2EEF4] rounded-[12px] px-4 py-3">
              <View className="flex-row items-center gap-3">
                <View className="w-3.5 h-3.5 rounded-full bg-[#1DD75B]" />
                <Text className="text-[14px] font-medium text-[#444]">Answered</Text>
              </View>
              <Text className="text-[15px] font-bold text-[#1E1E2D]">2</Text>
            </View>

            {/* Marked */}
            <View className="flex-row justify-between items-center bg-white border border-[#F2EEF4] rounded-[12px] px-4 py-3">
              <View className="flex-row items-center gap-3">
                <View className="w-3.5 h-3.5 rounded-full bg-[#FFB020]" />
                <Text className="text-[14px] font-medium text-[#444]">Marked for Revisit</Text>
              </View>
              <Text className="text-[15px] font-bold text-[#1E1E2D]">2</Text>
            </View>

            {/* Not Answered */}
            <View className="flex-row justify-between items-center bg-white border border-[#F2EEF4] rounded-[12px] px-4 py-3">
              <View className="flex-row items-center gap-3">
                <View className="w-3.5 h-3.5 rounded-full bg-[#E61026]" />
                <Text className="text-[14px] font-medium text-[#444]">Not Answered</Text>
              </View>
              <Text className="text-[15px] font-bold text-[#1E1E2D]">6</Text>
            </View>
          </View>
        </View>

        {/* ── SECTION DETAILS ── */}
        <Text className="text-[18px] font-semibold text-[#1E1E2D] mb-4">Section Details</Text>
        
        <View className="bg-white rounded-[24px] p-5 border border-[#F2EEF4] shadow-sm">
          <View className="border-b border-[#F2EEF4] pb-4 mb-4">
            <Text className="text-[15px] font-semibold text-[#333] mb-1">New Test</Text>
            <Text className="text-[13px] text-[#888]">Add Module 1</Text>
          </View>

          {/* Stats in Row */}
          <View className="flex-row justify-between items-center px-2">
            <View className="items-center">
              <Text className="text-[11px] font-semibold text-[#888] mb-2 tracking-wide">ANSWERED</Text>
              <View className="bg-[#E8F8F0] px-3 py-1.5 rounded-full">
                <Text className="text-[#1DD75B] text-[13px] font-bold">2</Text>
              </View>
            </View>

            <View className="items-center">
              <Text className="text-[11px] font-semibold text-[#888] mb-2 tracking-wide">MARKED</Text>
              <View className="bg-[#FFF8EB] px-3 py-1.5 rounded-full">
                <Text className="text-[#FFB020] text-[13px] font-bold">2</Text>
              </View>
            </View>

            <View className="items-center">
              <Text className="text-[11px] font-semibold text-[#888] mb-2 tracking-wide">NOT ANSWERED</Text>
              <View className="bg-[#FDE8E8] px-3 py-1.5 rounded-full">
                <Text className="text-[#E61026] text-[13px] font-bold">6</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ── BOTTOM ACTION BAR ── */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F2EEF4] p-4 flex-row gap-3">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="flex-1 py-3.5 border border-[#E5E5E5] rounded-[12px] items-center justify-center bg-white"
        >
          <Text className="text-[15px] font-medium text-[#444]">Cancel, return to test</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => {
            // Placeholder: Go back to dashboard after submitting
            router.replace('/(student)/tests');
          }}
          className="flex-1 py-3.5 rounded-[12px] items-center justify-center bg-[#F67300]"
        >
          <Text className="text-[15px] font-semibold text-white">Submit Test</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
