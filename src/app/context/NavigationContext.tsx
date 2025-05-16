"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  leftTabs: number[];
  rightTabs: number[];
  setLeftTabs: (tabs: number[]) => void;
  setRightTabs: (tabs: number[]) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
  direction: "left" | "right";
  setDirection: (direction: "left" | "right") => void;
  animationBatch: { direction: "left" | "right"; tabIndices: number[] } | null;
  setAnimationBatch: (
    batch: { direction: "left" | "right"; tabIndices: number[] } | null
  ) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [leftTabs, setLeftTabs] = useState<number[]>([0]);
  const [rightTabs, setRightTabs] = useState<number[]>([1, 2, 3]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [animationBatch, setAnimationBatch] = useState<{
    direction: "left" | "right";
    tabIndices: number[];
  } | null>(null);

  return (
    <NavigationContext.Provider
      value={{
        leftTabs,
        rightTabs,
        setLeftTabs,
        setRightTabs,
        activeIndex,
        setActiveIndex,
        isAnimating,
        setIsAnimating,
        direction,
        setDirection,
        animationBatch,
        setAnimationBatch,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
