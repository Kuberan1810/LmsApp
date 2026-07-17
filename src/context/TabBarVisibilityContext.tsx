import React, { createContext, useContext, ReactNode } from 'react';
import { useSharedValue, SharedValue, withTiming, useAnimatedScrollHandler, Easing } from 'react-native-reanimated';

interface TabBarVisibilityContextType {
  tabBarOffset: SharedValue<number>;
  isTabBarVisible: boolean;
  setIsTabBarVisible: (visible: boolean) => void;
}

const TabBarVisibilityContext = createContext<TabBarVisibilityContextType | null>(null);

export function TabBarVisibilityProvider({ children }: { children: ReactNode }) {
  const tabBarOffset = useSharedValue(0);
  const [isTabBarVisible, setIsTabBarVisible] = React.useState(true);

  return (
    <TabBarVisibilityContext.Provider value={{ tabBarOffset, isTabBarVisible, setIsTabBarVisible }}>
      {children}
    </TabBarVisibilityContext.Provider>
  );
}

export function useTabBarVisibility() {
  const context = useContext(TabBarVisibilityContext);
  if (!context) {
    throw new Error('useTabBarVisibility must be used within a TabBarVisibilityProvider');
  }
  return context;
}

export function useTabBarScroll() {
  const { tabBarOffset } = useTabBarVisibility();
  const lastScrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const diff = currentScrollY - lastScrollY.value;

      if (currentScrollY <= 0) {
        tabBarOffset.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) });
      } else if (diff > 2 && currentScrollY > 50) {
        // Scrolling down (hide) - translating down by 120 pixels
        tabBarOffset.value = withTiming(120, { duration: 300, easing: Easing.out(Easing.ease) });
      } else if (diff < -2) {
        // Scrolling up (show) - translating back to 0
        tabBarOffset.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) });
      }

      lastScrollY.value = currentScrollY;
    },
  });

  return scrollHandler;
}
