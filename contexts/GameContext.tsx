import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GameState {
  visitedNodes: string[];
  flags: string[];
}

interface GameContextType {
  visitedNodes: string[];
  flags: string[];
  addVisitedNode: (nodeId: string) => void;
  addFlag: (flag: string) => void;
  hasFlag: (flag: string) => boolean;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>({
    visitedNodes: [],
    flags: [],
  });

  // Ładujemy stan z AsyncStorage na starcie
  useEffect(() => {
    loadGameState();
  }, []);

  const loadGameState = async () => {
    try {
      console.log('Loading game state from storage...');
      const savedState = await AsyncStorage.getItem('gameState');
      console.log('Loaded state from storage:', savedState);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        console.log('Parsed state:', parsedState);
        setGameState(parsedState);
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
  };

  // Zapisujemy stan do AsyncStorage przy każdej zmianie
  useEffect(() => {
    saveGameState();
  }, [gameState]);

  const saveGameState = async () => {
    try {
      console.log('Saving game state:', gameState);
      await AsyncStorage.setItem('gameState', JSON.stringify(gameState));
      console.log('Game state saved successfully');
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };

  const addVisitedNode = (nodeId: string) => {
    console.log('Adding visited node:', nodeId);
    setGameState(prev => {
      const newState = {
        ...prev,
        visitedNodes: [...new Set([...prev.visitedNodes, nodeId])],
      };
      console.log('New state after adding visited node:', newState);
      return newState;
    });
  };

  const addFlag = (flag: string) => {
    console.log('Adding flag:', flag);
    setGameState(prev => {
      const newState = {
        ...prev,
        flags: [...new Set([...prev.flags, flag])],
      };
      console.log('New state after adding flag:', newState);
      return newState;
    });
  };

  const hasFlag = (flag: string) => {
    const hasFlag = gameState.flags.includes(flag);
    console.log('Checking flag:', flag, 'Result:', hasFlag);
    return hasFlag;
  };

  // Resetujemy stan gry i czyścimy AsyncStorage
  const resetGame = async () => {
    try {
      console.log('Starting game reset...');
      console.log('Current state before reset:', gameState);
      
      console.log('Removing state from AsyncStorage...');
      await AsyncStorage.removeItem('gameState');
      console.log('AsyncStorage cleared');
      
      console.log('Setting state to empty...');
      setGameState({
        visitedNodes: [],
        flags: [],
      });
      
      // Verify the reset
      const verifyStorage = await AsyncStorage.getItem('gameState');
      console.log('Verifying storage after reset:', verifyStorage);
      
      console.log('Game state reset completed');
    } catch (error) {
      console.error('Error during game reset:', error);
    }
  };

  return (
    <GameContext.Provider
      value={{
        visitedNodes: gameState.visitedNodes,
        flags: gameState.flags,
        addVisitedNode,
        addFlag,
        hasFlag,
        resetGame,
      }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}