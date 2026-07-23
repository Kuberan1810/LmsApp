import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

export function FloatingReaction({ emoji, onComplete }: { emoji: string; onComplete: () => void }) {
  const animY = useRef(new Animated.Value(0)).current;
  const animX = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const targetX = (Math.random() - 0.5) * 120;
    const duration = 2000 + Math.random() * 500;

    Animated.parallel([
      Animated.timing(animY, {
        toValue: -320 - Math.random() * 80,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(animX, {
        toValue: targetX,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(animOpacity, {
        toValue: 0,
        duration: duration - 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete();
    });
  }, []);

  return (
    <Animated.Text
      className="absolute bottom-[100px] self-center text-4xl z-[99]"
      style={{
        opacity: animOpacity,
        transform: [{ translateY: animY }, { translateX: animX }],
      }}
    >
      {emoji}
    </Animated.Text>
  );
}

interface EmojiPickerProps {
  showEmojiPicker: boolean;
  setShowEmojiPicker: (show: boolean) => void;
  spawnReaction: (emoji: string) => void;
}

export function EmojiPicker({
  showEmojiPicker,
  setShowEmojiPicker,
  spawnReaction,
}: EmojiPickerProps) {
  if (!showEmojiPicker) return null;

  return (
    <>
      {/* Backdrop dismiss */}
      <TouchableOpacity
    
        activeOpacity={1}
        onPress={() => setShowEmojiPicker(false)}
        className="absolute inset-0 z-[195]"
      />
      <View
        className="absolute bottom-[110px] self-center bg-[#1C2128] rounded-[22px] border border-white/10 px-[18px] py-[14px] flex-row gap-4 z-[200] shadow-black shadow-2xl"
        style={{ elevation: 15 }}
      >
        {['👍', '❤️', '😂', '👏', '🎉', '😍', '🔥'].map((em) => (
          <TouchableOpacity
            key={em}
            onPress={() => {
              spawnReaction(em);
              setShowEmojiPicker(false);
            }}
            className="items-center justify-center"
          >
            <Text className="text-[28px]">{em}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
