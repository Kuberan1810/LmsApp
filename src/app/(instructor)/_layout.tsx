import QuickActionsModal from '@/components/Instructor/QuickActionsModal';
import { TabBarVisibilityProvider, useTabBarVisibility } from '@/context/TabBarVisibilityContext';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Tabs, useRouter, useSegments } from 'expo-router';
import { Add, DocumentText, DocumentText1, Home2, Profile2User } from 'iconsax-react-native';
import { useState } from 'react';

import { LayoutAnimation, LogBox, Platform, Text, TouchableOpacity, UIManager, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useHaptics } from '@/context/HapticsContext';


LogBox.ignoreLogs(['setLayoutAnimationEnabledExperimental is currently a no-op']);

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  try {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  } catch (e) {
    // Ignore in New Architecture
  }
}

function CustomInstructorTabBar({ state, descriptors, navigation, onAddPress }: BottomTabBarProps & { onAddPress: () => void }) {
  const { tabBarOffset, isTabBarVisible } = useTabBarVisibility();
  const router = useRouter();
  const { hapticsEnabled } = useHaptics();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: tabBarOffset.value }],
    };
  });

  const segments = useSegments();

  // Only show tab bar on root routes: /(instructor)/courses, /(instructor)/students, /(instructor)/dashboard/dashboard
  const isMainRoute = 
    (segments.length === 3 && segments[1] === 'dashboard' && segments[2] === 'dashboard') ||
    (segments.length === 2 && (segments[1] === 'courses' || segments[1] === 'students'));


  if (!isMainRoute || !isTabBarVisible) {
    return null;
  }

  const visibleRoutes = state.routes.filter(r =>
    ['dashboard/dashboard', 'courses', 'students'].includes(r.name)
  );

  const tabContent = visibleRoutes.map((route) => {
    const { options } = descriptors[route.key];
    const label = options.title !== undefined ? options.title : route.name;
    const isFocused = state.index === state.routes.findIndex(r => r.key === route.key);

    const onPress = () => {
      // You can change intensity here: Light, Medium, or Heavy
      if (hapticsEnabled) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      LayoutAnimation.configureNext({
        duration: 500,
        create: { type: LayoutAnimation.Types.spring, property: LayoutAnimation.Properties.opacity, springDamping: 0.85 },
        update: { type: LayoutAnimation.Types.spring, springDamping: 0.85 },
        delete: { type: LayoutAnimation.Types.spring, property: LayoutAnimation.Properties.opacity, springDamping: 0.85 },
      });
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        if (route.name === 'dashboard/dashboard') {
          router.navigate('/(instructor)/dashboard/dashboard');
        } else if (route.name === 'courses') {
          router.navigate('/(instructor)/courses');
        } else if (route.name === 'students') {
          router.navigate('/(instructor)/students');
        } else {
          navigation.navigate(route.name);
        }
      }
    };

    let IconComponent: any = Home2;
    if (route.name === 'courses') IconComponent = isFocused ? DocumentText : DocumentText1;
    if (route.name === 'students') IconComponent = Profile2User;

    return (
      <TouchableOpacity
        key={route.key}
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
          paddingHorizontal: isFocused ? 20 : 12,
          paddingVertical: 12,
          borderRadius: 30,
        }}
      >
        <IconComponent size={24} color={isFocused ? "#FFFFFF" : "#8A8A8E"} variant={isFocused ? "Bold" : "Linear"} />
        {isFocused && (
          <Text style={{ color: '#FFFFFF', fontWeight: '600', marginLeft: 8, fontSize: 15 }}>
            {label as string}
          </Text>
        )}
      </TouchableOpacity>
    );
  });

  const tabStyle = {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    backgroundColor: Platform.OS === 'android' ? '#1C1C1E' : 'rgba(30, 30, 45, 0.85)',
    borderRadius: 40,
    paddingHorizontal: 8,
    paddingVertical: 8,
    overflow: 'hidden' as const,
  };

  return (
    <Animated.View style={[{
      position: 'absolute',
      bottom: 24,
      left: 20,
      right: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }, animatedStyle]}>

      <View style={{
        flex: 1,
        marginRight: 16,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: Platform.OS === 'android' ? 0 : 10,
        backgroundColor: 'transparent',
      }}>
        {Platform.OS === 'android' ? (
          <View style={tabStyle}>
            {tabContent}
          </View>
        ) : (
          <BlurView
            intensity={80}
            tint="dark"
            blurMethod="dimezisBlurView"
            style={tabStyle}
          >
            {tabContent}
          </BlurView>
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          // You can change intensity here: Light, Medium, or Heavy
          if (hapticsEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
          onAddPress();
        }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#F67300',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#F6730050',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.35,
          shadowRadius: 12,
          elevation: 10,
        }}
      >
        <Add size={32} color="#FFFFFF" variant="Linear" />
      </TouchableOpacity>

    </Animated.View>
  );
}

export default function InstructorLayout() {
  const [isQuickActionsVisible, setQuickActionsVisible] = useState(false);

  return (
    <TabBarVisibilityProvider>
      <Tabs
        tabBar={props => <CustomInstructorTabBar {...props as any} onAddPress={() => setQuickActionsVisible(true)} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="dashboard/dashboard" options={{ title: 'Home' }} />
        <Tabs.Screen name="courses" options={{ title: 'Courses' }} />
        <Tabs.Screen name="students" options={{ title: 'Students' }} />
        <Tabs.Screen name="test-details" options={{ href: null }} />
        <Tabs.Screen name="review" options={{ href: null }} />



      </Tabs>

      <QuickActionsModal
        visible={isQuickActionsVisible}
        onClose={() => setQuickActionsVisible(false)}
      />
    </TabBarVisibilityProvider>
  );

}