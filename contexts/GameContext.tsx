// contexts/GameContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'BOARDGAME_STATE';

type Flags = Set<string>;
type Visited = Set<string>;

type GameCtx = {
  flags: Flags;
  visited: Visited;
  hasFlag: (name: string) => boolean;
  addFlag: (name: string) => void;
  isVisited: (id: string) => boolean;
  addVisitedNode: (id: string) => void;
  resetGame: () => Promise<void>;
};

const GameContext = createContext<GameCtx | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [flags, setFlags] = useState<Flags>(new Set());
  const [visited, setVisited] = useState<Visited>(new Set());

  /* ----------  FLAGI  ---------- */
  const hasFlag = (name: string) => flags.has(name);

  const addFlag = (name: string) =>
    setFlags(prev => {
      const next = new Set(prev).add(name);
      console.log('ADD FLAG →', name, [...next]);
      return next;
    });

  /* ----------  VISITED NODES  ---------- */
  const isVisited = (id: string) => visited.has(id);

  const addVisitedNode = (id: string) =>
    setVisited(prev => {
      const next = new Set(prev).add(id);
      console.log('VISIT NODE →', id, [...next]);
      return next;
    });

  /* ----------  RESET CAŁEJ GRY  ---------- */
  const resetGame = async () => {
    console.log('RESET GAME!');
    setFlags(new Set());
    setVisited(new Set());
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <GameContext.Provider
      value={{
        flags,
        visited,
        hasFlag,
        addFlag,
        isVisited,
        addVisitedNode,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be inside <GameProvider>');
  return ctx;
};
