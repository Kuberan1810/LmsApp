import { useHaptics } from '@/context/HapticsContext';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomSwitch = ({ value, onValueChange }: { value: boolean, onValueChange: (val: boolean) => void }) => {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const { hapticsEnabled } = useHaptics();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22]
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E2E8F0', '#F67300']
  });

  const handlePress = () => {
    if (hapticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onValueChange(!value);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Animated.View style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        backgroundColor,
        justifyContent: 'center',
      }}>
        <Animated.View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            transform: [{ translateX }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
            elevation: 2,
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function InstructorSettingsScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const { hapticsEnabled, setHapticsEnabled } = useHaptics();

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <View className="flex-1 px-5 pt-2">
        {/* Header */}
        <View className="flex-row items-center mb-8 mt-2">
          <TouchableOpacity onPress={() => router.back()} className="mr-3 p-1 -ml-1">
            <Feather name="chevron-left" size={24} color="#333333" />
          </TouchableOpacity>
          <Text className="text-[18px] font-medium text-[#333333]">Settings</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Notifications Section */}
          <Text className="text-[20px] font-medium text-[#64748B] mb-3">Notifications</Text>
          <View className="bg-white rounded-xl border border-[#F1F5F9] mb-8 shadow-sm shadow-gray-100">
            <View className="flex-row items-center justify-between p-4 border-b border-[#F1F5F9]">
              <View className="flex-row items-center">
                <Feather name="bell" size={18} color="#333333" />
                <Text className="text-[14px] text-[#333333] ml-3">Push Notification</Text>
              </View>
              <CustomSwitch
                value={pushEnabled}
                onValueChange={setPushEnabled}
              />
            </View>
          </View>

          {/* Haptics Section */}
          <Text className="text-[20px] font-medium text-[#64748B] mb-3">Haptics</Text>
          <View className="bg-white rounded-xl border border-[#F1F5F9] mb-8 shadow-sm shadow-gray-100">
            <View className="flex-row items-center justify-between p-4 border-b border-[#F1F5F9]">
              <View className="flex-row items-center">
                <Feather name="activity" size={18} color="#333333" />
                <Text className="text-[14px] text-[#333333] ml-3">Haptic Feedback</Text>
              </View>
              <CustomSwitch
                value={hapticsEnabled}
                onValueChange={setHapticsEnabled}
              />
            </View>
          </View>

          {/* Support & Legal Section */}
          <Text className="text-[20px] font-medium text-[#64748B] mb-3">Support & Legal</Text>
          <View className="bg-white rounded-xl border border-[#F1F5F9] mb-12 shadow-sm shadow-gray-100">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-[#F1F5F9]">
              <View className="flex-row items-center">
                <Feather name="help-circle" size={18} color="#333333" />
                <Text className="text-[14px] text-[#333333] ml-3">Help Center</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-[#F1F5F9]">
              <View className="flex-row items-center">
                <Feather name="headphones" size={18} color="#333333" />
                <Text className="text-[14px] text-[#333333] ml-3">Terms of Service</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <Feather name="shield" size={18} color="#333333" />
                <Text className="text-[14px] text-[#333333] ml-3">Privacy Policy</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
