import { useHaptics } from '@/context/HapticsContext';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Notification, SearchNormal1 } from 'iconsax-react-native';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DashboardHeader() {
  const router = useRouter();
  const { hapticsEnabled } = useHaptics();

  return (
    <View className="px-5 pt-4 pb-2">
      {/* Top Navigation Row */}
      <View className="flex-row items-center justify-between mb-8">
        {/* Logo */}
        <View className="w-24 h-8 justify-center">
          <Image
            source={require('../../../../assets/images/header-logo.svg')}
            contentFit="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-2.5 mx-4 flex-1">
          <SearchNormal1 size="18" color="#888888" />
          <TextInput
            className="flex-1 ml-2 text-[13px] text-black"
            placeholder="Search courses, assignments..."
            placeholderTextColor="#A0A0A0"
          />
        </View>

        {/* Notifications and Profile */}
        <View className="flex-row items-center">
          <TouchableOpacity
            className="mr-4 relative"
            onPress={() => {
              if (hapticsEnabled) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              router.push('/(student)/notifications' as any);
            }}
          >
            <View className="relative mr-4 bg-gray-50 p-2.5 rounded-full border border-gray-100">
              <Notification size="22" color="#333333" />
              <View className="absolute top-2.5 right-3 w-2 h-2 bg-[#EE8B3A] rounded-full border-2 border-gray-50" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (hapticsEnabled) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              router.push('/(student)/profile/profile' as any);
            }}
            className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-gray-100 items-center justify-center"
          >
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
              contentFit="cover"
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dashboard Title Section */}
      <Text className="text-[28px] font-semibold text-black tracking-tight">Dashboard</Text>
      <Text className="text-[13px] text-gray-500 mt-0.5">Welcome Philip stanton</Text>
    </View>
  );
}
