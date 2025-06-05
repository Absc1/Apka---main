// contexts/GameContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'BOARDGAME_FLAGS';

type Flags = Set<string>;

type GameCtx = {
  flags: Flags;
  hasFlag: (name: string) => boolean;
  addFlag: (name: string) => void;
  resetGame: () => Promise<void>;
};

const GameContext = createContext<GameCtx | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [flags, setFlags] = useState<Flags>(new Set());

  const hasFlag = (name: string) => flags.has(name);

  const addFlag = (name: string) =>
    setFlags(prev => {
      const next = new Set(prev).add(name);
      console.log('ADD FLAG →', name, [...next]);
      return next;
    });

  const resetGame = async () => {
    console.log('RESET GAME!');
    setFlags(new Set());
    await AsyncStorage.removeItem(STORAGE_KEY);   // jeśli zapisujesz też w pamięci
  };

  return (
    <GameContext.Provider value={{ flags, hasFlag, addFlag, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be inside <GameProvider>');
  return ctx;
};
