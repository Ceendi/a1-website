"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import HomeContent from "./tabs/HomeContent";
import ProjectsContent from "./tabs/ProjectsContent";
import BlogContent from "./tabs/BlogContent";
import AboutContent from "./tabs/AboutContent";

const PAGES = [
  { id: "home", label: "HOME", path: "/", content: <HomeContent /> },
  {
    id: "projects",
    label: "PROJECTS",
    path: "/projects",
    content: <ProjectsContent />,
  },
  { id: "blog", label: "BLOG", path: "/blog", content: <BlogContent /> },
  { id: "about", label: "ABOUT", path: "/about", content: <AboutContent /> },
];

interface AnimationBatch {
  direction: "left" | "right";
  tabIndices: number[];
}

interface AnimationProps {
  leftTabsLength: number;
  rightTabsLength: number;
  animatedTabsLength: number;
}

export default function AnimatedNav() {
  const router = useRouter();
  const pathname = usePathname();

  // Znajdź początkowy indeks na podstawie ścieżki
  const initialActiveIndex = PAGES.findIndex((page) => page.path === pathname);
  const initialLeftTabs = PAGES.slice(0, initialActiveIndex + 1).map(
    (_, i) => i
  );
  const initialRightTabs = PAGES.slice(initialActiveIndex + 1).map(
    (_, i) => initialActiveIndex + 1 + i
  );

  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [leftTabs, setLeftTabs] = useState<number[]>(initialLeftTabs);
  const [rightTabs, setRightTabs] = useState<number[]>(initialRightTabs);
  const [animationBatch, setAnimationBatch] = useState<AnimationBatch | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null
  );

  // Handle tab click with proper animation direction
  const handleTabClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);

    // Set direction based on which side the tab is clicked from
    setDirection(rightTabs.includes(index) ? "left" : "right");

    // Determine which tabs should be animated
    let tabsToAnimate: number[] = [];
    if (rightTabs.includes(index)) {
      // When moving from right to left, animate all tabs between the clicked tab and the leftmost tab
      const clickedIndex = rightTabs.indexOf(index);
      tabsToAnimate = rightTabs.slice(0, clickedIndex + 1);
    } else {
      // When moving from left to right, animate all tabs between the clicked tab and the rightmost tab
      const clickedIndex = leftTabs.indexOf(index);
      tabsToAnimate = leftTabs.slice(clickedIndex + 1);
    }

    const newDirection = rightTabs.includes(index) ? "left" : "right";

    setAnimationBatch({
      direction: newDirection,
      tabIndices: [...tabsToAnimate],
    });

    if (rightTabs.includes(index)) {
      // Moving from right to left
      const newRightTabs = rightTabs.filter(
        (tab) => !tabsToAnimate.includes(tab)
      );
      setRightTabs(newRightTabs);
      // Left tabs will be updated after animation completes
    } else {
      // Moving from left to right
      const newLeftTabs = leftTabs.filter(
        (tab) => !tabsToAnimate.includes(tab)
      );
      setLeftTabs(newLeftTabs);
      // Right tabs will be updated after animation completes
    }
    setActiveIndex(index);
    setPendingNavigation(PAGES[index].path);
  };

  // Handle animation completion
  const handleAnimationComplete = () => {
    if (!animationBatch) return;

    const { direction, tabIndices } = animationBatch;
    if (direction === "left") {
      // After moving from right to left, add animated tabs to leftTabs
      const newLeftTabs = [...leftTabs, ...tabIndices].sort((a, b) => a - b);
      setLeftTabs(newLeftTabs);
    } else {
      // After moving from left to right, add animated tabs to rightTabs
      const newRightTabs = [...rightTabs, ...tabIndices].sort((a, b) => a - b);
      setRightTabs(newRightTabs);
    }
    setAnimationBatch(null);

    // Wykonaj przekierowanie po zakończeniu animacji
    if (pendingNavigation) {
      router.push(pendingNavigation, { scroll: false });
      setPendingNavigation(null);
    }
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const contentVariants = {
    enter: ({
      leftTabsLength,
      rightTabsLength,
      animatedTabsLength,
    }: AnimationProps) => ({
      x:
        direction === "left"
          ? `calc(100vw - ${4 * 6}rem)`
          : `calc(-100vw + ${4 * 6}rem)`,
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x:
        direction === "left"
          ? `calc(-100vw + ${4 * 6}rem)`
          : `calc(100vw - ${4 * 6}rem)`,
      opacity: 1,
    }),
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Left side tabs */}
      <div className="absolute left-0 top-0 h-full flex flex-row z-30">
        {leftTabs.map((index) => (
          <motion.button
            key={PAGES[index].id}
            onClick={() => handleTabClick(index)}
            disabled={isAnimating}
            className={`w-24 h-full flex items-center justify-center cursor-pointer select-none
              ${
                index === activeIndex ? "bg-gray-500 text-white" : "bg-gray-200"
              }
            `}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              rotate: "180deg",
              fontSize: "1.2rem",
              letterSpacing: "2px",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {PAGES[index].label}
          </motion.button>
        ))}
      </div>

      {/* Right side tabs */}
      <div className="absolute top-0 h-full flex flex-row z-30 right-0">
        {rightTabs.map((index) => (
          <motion.button
            key={PAGES[index].id}
            onClick={() => handleTabClick(index)}
            disabled={isAnimating}
            className="w-24 h-full flex items-center justify-center cursor-pointer select-none bg-gray-200"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              rotate: "180deg",
              fontSize: "1.2rem",
              letterSpacing: "2px",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {PAGES[index].label}
          </motion.button>
        ))}
      </div>

      {/* Content area with animations */}
      <div className="w-full h-full flex items-center justify-center">
        {/* Animated tabs */}
        <AnimatePresence
          mode="popLayout"
          custom={direction}
          initial={false}
          onExitComplete={handleAnimationComplete}
        >
          <motion.div
            key={activeIndex}
            custom={{
              leftTabsLength: leftTabs.length,
              rightTabsLength: rightTabs.length,
              animatedTabsLength: animationBatch?.tabIndices.length,
            }}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-0 w-full h-full flex items-center justify-center bg-white"
          >
            {/* Content */}
            <div className="absolute flex-1 flex items-center justify-center w-full">
              {PAGES[activeIndex].content}
            </div>

            {/* Tab indicators */}
            {(direction === "right"
              ? animationBatch?.tabIndices.slice().reverse()
              : animationBatch?.tabIndices
            )?.map((tabIndex, index) => (
              <div
                key={PAGES[tabIndex].id}
                className={`absolute top-0 h-full w-24 flex items-center justify-center       
                  ${
                    animationBatch?.direction === "left" &&
                    index === animationBatch.tabIndices.length - 1
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200"
                  }`}
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  rotate: "180deg",
                  fontSize: "1.2rem",
                  letterSpacing: "2px",
                  left:
                    direction === "left"
                      ? `calc(${leftTabs.length * 6}rem + ${index * 6}rem)`
                      : `calc(100vw - ${(rightTabs.length + 1) * 6}rem - ${
                          index * 6
                        }rem)`,
                }}
              >
                {PAGES[tabIndex].label}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
