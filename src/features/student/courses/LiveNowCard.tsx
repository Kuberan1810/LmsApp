import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export const LiveNowCard = () => {
  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds for demonstration
  const [isLive, setIsLive] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsLive(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time (HH:MM:SS)
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-3 px-1">
        <Animated.View 
          style={{ opacity: fadeAnim }}
          className="w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" 
        />
        <Text className="text-[#333333] font-semibold text-lg">Live Now</Text>
      </View>

      <View className="rounded-3xl overflow-hidden bg-orange-400 h-44 relative justify-center">
        <Image 
          source={require('@/assets/images/erollBg.png')} 
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          contentFit="cover"
        />
        <View className={`flex-1 p-5 relative z-10 ${!isLive ? 'justify-between' : 'justify-center'}`}>
          {!isLive ? (
            <>
              <View className="flex-row justify-between">
                <View className="flex-1 pr-4">
                  <Text className="text-white font-bold text-base mb-1">AM101 - AI / ML Frontier</Text>
                  <Text className="text-white/80 text-xs">Lesson name: AI safety & real-world use cases</Text>
                </View>
                
                <View className="flex-row gap-2">
                  <View className="bg-white rounded-lg w-10 h-10 items-center justify-center">
                    <Text className="text-black font-bold text-lg">{pad(hours)}</Text>
                  </View>
                  <View className="bg-white rounded-lg w-10 h-10 items-center justify-center">
                    <Text className="text-black font-bold text-lg">{pad(minutes)}</Text>
                  </View>
                  <View className="bg-white rounded-lg w-10 h-10 items-center justify-center">
                    <Text className="text-black font-bold text-lg">{pad(seconds)}</Text>
                  </View>
                </View>
              </View>

              <View className="flex-row items-end justify-between">
                <View>
                  <Text className="text-white font-bold text-2xl mb-1">Starting Soon</Text>
                  <Text className="text-white/90 text-sm">Time : 10:00 AM</Text>
                </View>
                <TouchableOpacity className="bg-orange-600 px-4 py-2 rounded-xl" onPress={() => router.push('/(student)/meet' as any)}>
                  <Text className="text-white font-medium text-sm">Join Class</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View className="flex-row items-center justify-between mt-2">
              <View className="flex-1 pr-4">
                <Text className="text-white font-bold text-lg mb-1">AM101 -AI / ML Frontier AI Engineer</Text>
                <Text className="text-white/90 text-xs mb-3">Lesson name: AI safety & real-world use cases</Text>
                <View className="flex-row items-center">
                  <Feather name="users" size={14} color="white" />
                  <Text className="text-white text-xs ml-2">200 Students attending</Text>
                </View>
              </View>
              <TouchableOpacity className="bg-orange-600 px-5 py-2.5 rounded-xl" onPress={() => router.push('/(student)/meet' as any)}>
                <Text className="text-white font-medium text-sm">Join Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
