import '../global.css';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

// Disable the strict-mode "Writing to value during render" warning.
// This fires as a false-positive when React Native's LayoutAnimation is used
// alongside Reanimated — both systems co-exist fine at runtime.
// See: https://docs.swmansion.com/react-native-reanimated/docs/debugging/logger-configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

import { DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import { useFonts, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold, Urbanist_800ExtraBold } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import React from 'react';
// import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HapticsProvider } from '@/context/HapticsContext';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
    Urbanist_800ExtraBold,
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (

    <ThemeProvider value={DefaultTheme}>
      <HapticsProvider>
        {/* <View className="flex-1 m-5"> */}
          <Stack screenOptions={{ headerShown: false }} />
        {/* </View> */}
      </HapticsProvider>
    </ThemeProvider>

  );
}
