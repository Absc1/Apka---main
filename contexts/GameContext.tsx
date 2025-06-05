import { router } from 'expo-router'; 
// contexts/GameContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'BOARDGAME_STATE';

type Flags   = Set<string>;
type Visited = Set<string>;

type GameCtx = {
  sessionId: string;
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
  /** --------- stan gry --------- */
  const [flags,   setFlags]   = useState<Flags>(new Set());
  const [visited, setVisited] = useState<Visited>(new Set());
  /** --------- identyfikator sesji (do remountu appki) --------- */
  const [sessionId, setSessionId] = useState(() => Date.now().toString());

  /** --------- flagi --------- */
  const hasFlag = (name: string) => flags.has(name);
  const addFlag = (name: string) =>
    setFlags(prev => new Set(prev).add(name));

  /** --------- odwiedzone węzły --------- */
  const isVisited = (id: string) => visited.has(id);
  const addVisitedNode = (id: string) =>
    setVisited(prev => new Set(prev).add(id));

  /** --------- reset całej gry --------- */
  const resetGame = async () => {
  console.log('RESET GAME!');
  setFlags(new Set());
  setVisited(new Set());
  await AsyncStorage.removeItem(STORAGE_KEY);

  // ① wymuś NOWĄ sesję (remount całej appki)
  setSessionId(Date.now().toString());

  // ② ustaw docelową trasę, gdy nowy stack już powstanie
  setTimeout(() => router.replace('/'), 0);
};

  /** --------- jednorazowe wczytanie zapisu --------- */
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const { flags: f = [], visited: v = [] } = JSON.parse(saved);
          setFlags(new Set(f));
          setVisited(new Set(v));
        } catch {
          await AsyncStorage.removeItem(STORAGE_KEY);
        }
      }
    })();
  }, [sessionId]); // po resetGame() hook NIE załaduje starych flag

  /** --------- auto-zapis przy każdej zmianie --------- */
  useEffect(() => {
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ flags: [...flags], visited: [...visited] }),
    );
  }, [flags, visited]);

  return (
    <GameContext.Provider
      value={{
        sessionId,
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
