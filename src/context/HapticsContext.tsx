import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HapticsContextType {
  hapticsEnabled: boolean;
  setHapticsEnabled: (enabled: boolean) => void;
}

const HapticsContext = createContext<HapticsContextType | null>(null);

export function HapticsProvider({ children }: { children: ReactNode }) {
  const [hapticsEnabled, setHapticsEnabled] = useState(true);

  return (
    <HapticsContext.Provider value={{ hapticsEnabled, setHapticsEnabled }}>
      {children}
    </HapticsContext.Provider>
  );
}

export function useHaptics() {
  const context = useContext(HapticsContext);
  if (!context) {
    throw new Error('useHaptics must be used within a HapticsProvider');
  }
  return context;
}
