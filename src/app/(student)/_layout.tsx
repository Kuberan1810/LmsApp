import { TabBarVisibilityProvider, useTabBarVisibility } from '@/context/TabBarVisibilityContext';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Tabs, usePathname } from 'expo-router';
import { CalendarTick, ClipboardText, DocumentText, DocumentText1, Home2, NoteText } from 'iconsax-react-native';
import React, { useState } from 'react';
import { LayoutAnimation, LogBox, Platform, Text, TouchableOpacity, UIManager, View } from 'react-native';
import Animated, { useAnimatedStyle, LinearTransition, FadeIn, FadeOut, withTiming, Easing } from 'react-native-reanimated';

LogBox.ignoreLogs(['setLayoutAnimationEnabledExperimental is currently a no-op']);

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  try {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  } catch (e) {
    // Ignore in New Architecture
  }
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { tabBarOffset, isTabBarVisible } = useTabBarVisibility();
  const pathname = usePathname();
  const [tabLayouts, setTabLayouts] = useState<{ [key: string]: { x: number; y: number; width: number; height: number } }>({});

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: tabBarOffset.value }],
    };
  });

  const activeRouteKey = state.routes[state.index]?.key;
  const activeLayout = tabLayouts[activeRouteKey];

  const indicatorStyle = useAnimatedStyle(() => {
    if (!activeLayout) return { opacity: 0 };
    return {
      position: 'absolute',
      left: withTiming(activeLayout.x, { duration: 350, easing: Easing.out(Easing.exp) }),
      top: withTiming(activeLayout.y, { duration: 350, easing: Easing.out(Easing.exp) }),
      width: withTiming(activeLayout.width, { duration: 350, easing: Easing.out(Easing.exp) }),
      height: withTiming(activeLayout.height, { duration: 350, easing: Easing.out(Easing.exp) }),
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderRadius: 30,
      opacity: 1,
    };
  }, [activeLayout]);

  const mainRoutes = [
    '/dashboard', '/dashboard/dashboard', 
    '/courses', '/courses/index',
    '/assignments', '/assignments/assignments', 
    '/tests', '/tests/index'
  ];
  const isMainRoute = mainRoutes.includes(pathname);

  if (!isMainRoute || !isTabBarVisible) {
    return null;
  }

  const visibleRoutes = state.routes.filter(r =>
    ['dashboard/dashboard', 'courses', 'assignments', 'tests/index'].includes(r.name)
  );

  const tabContent = visibleRoutes.map((route, index) => {
    const { options } = descriptors[route.key];
    const label = options.title !== undefined ? options.title : route.name;
    const isFocused = state.index === state.routes.findIndex(r => r.key === route.key);

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    let IconComponent = Home2;
    if (route.name === 'courses') IconComponent = isFocused ? DocumentText : DocumentText1;
    if (route.name === 'assignments') IconComponent = NoteText;
    if (route.name === 'attendance/attendance') IconComponent = CalendarTick;
    if (route.name === 'tests/index') IconComponent = ClipboardText;

    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

    const onLayout = (event: any) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      setTabLayouts(prev => ({ ...prev, [route.key]: { x, y, width, height } }));
    };

    return (
      <AnimatedTouchableOpacity
        key={route.key}
        onPress={onPress}
        onLayout={onLayout}
        activeOpacity={0.8}
        layout={LinearTransition.duration(350).easing(Easing.out(Easing.exp))}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          paddingHorizontal: isFocused ? 20 : 12,
          paddingVertical: 12,
          borderRadius: 30,
          zIndex: 1,
        }}
      >
        <IconComponent size={24} color={isFocused ? "#FFFFFF" : "#8A8A8E"} variant={isFocused ? "Bold" : "Linear"} />
        {isFocused && (
          <Animated.Text 
            entering={FadeIn.duration(200)} 
            exiting={FadeOut.duration(200)}
            style={{ color: '#FFFFFF', fontWeight: '600', marginLeft: 8, fontSize: 15 }}
            numberOfLines={1}
          >
            {label as string}
          </Animated.Text>
        )}
      </AnimatedTouchableOpacity>
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
      borderRadius: 40,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: Platform.OS === 'android' ? 0 : 10,
      backgroundColor: 'transparent',
    }, animatedStyle]}>
      {Platform.OS === 'android' ? (
        <View style={tabStyle}>
          <Animated.View style={indicatorStyle} />
          {tabContent}
        </View>
      ) : (
        <BlurView
          intensity={80}
          tint="dark"
          blurMethod="dimezisBlurView"
          style={tabStyle}
        >
          <Animated.View style={indicatorStyle} />
          {tabContent}
        </BlurView>
      )}
    </Animated.View>
  );
}

export default function StudentLayout() {
  return (

    <TabBarVisibilityProvider>
      <Tabs
        tabBar={props => <CustomTabBar {...props as any} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="dashboard/dashboard" options={{ title: 'Home' }} />
        <Tabs.Screen name="courses" options={{ title: 'Courses' }} />
        <Tabs.Screen name="assignments" options={{ title: 'Tasks' }} />
        <Tabs.Screen name="attendance/attendance" options={{ href: null }} />
        <Tabs.Screen name="tests/index" options={{ title: 'Tests' }} />
        <Tabs.Screen name="profile/profile" options={{ href: null }} />

      </Tabs>
    </TabBarVisibilityProvider>

  );
}