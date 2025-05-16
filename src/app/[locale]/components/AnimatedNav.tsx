"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { usePages } from "../hooks/usePages";

interface AnimationBatch {
  direction: "left" | "right";
  tabIndices: number[];
}

export default function AnimatedNav() {
  const pages = usePages();
  const router = useRouter();
  const pathname = usePathname();

  // Znajdź początkowy indeks na podstawie ścieżki
  const initialActiveIndex = pages.findIndex((page) => page.path === pathname);
  const initialLeftTabs = pages
    .slice(0, initialActiveIndex + 1)
    .map((_, i) => i);
  const initialRightTabs = pages
    .slice(initialActiveIndex + 1)
    .map((_, i) => initialActiveIndex + 1 + i);

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

  // refreshing tabs and index when pathname changes
  useEffect(() => {
    const newActiveIndex = pages.findIndex((page) => page.path === pathname);
    if (newActiveIndex !== -1 && newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
      setLeftTabs(pages.slice(0, newActiveIndex + 1).map((_, i) => i));
      setRightTabs(
        pages.slice(newActiveIndex + 1).map((_, i) => newActiveIndex + 1 + i)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleTabClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);

    // direction of the animation
    const newDirection = rightTabs.includes(index) ? "left" : "right";
    setDirection(newDirection);

    // determine which tabs should be animated
    let tabsToAnimate: number[] = [];
    if (rightTabs.includes(index)) {
      const clickedIndex = rightTabs.indexOf(index);
      tabsToAnimate = rightTabs.slice(0, clickedIndex + 1);
    } else {
      const clickedIndex = leftTabs.indexOf(index);
      tabsToAnimate = leftTabs.slice(clickedIndex + 1);
    }

    setAnimationBatch({
      direction: newDirection,
      tabIndices: [...tabsToAnimate],
    });

    // update tabs after click
    if (rightTabs.includes(index)) {
      const newRightTabs = rightTabs.filter(
        (tab) => !tabsToAnimate.includes(tab)
      );
      setRightTabs(newRightTabs);
    } else {
      const newLeftTabs = leftTabs.filter(
        (tab) => !tabsToAnimate.includes(tab)
      );
      setLeftTabs(newLeftTabs);
    }
    setActiveIndex(index);
    setPendingNavigation(pages[index].path);
  };

  // after animation
  const handleAnimationComplete = () => {
    if (!animationBatch) return;

    const { direction, tabIndices } = animationBatch;
    // update tabs after animation
    if (direction === "left") {
      const newLeftTabs = [...leftTabs, ...tabIndices].sort((a, b) => a - b);
      setLeftTabs(newLeftTabs);
    } else {
      const newRightTabs = [...rightTabs, ...tabIndices].sort((a, b) => a - b);
      setRightTabs(newRightTabs);
    }
    setAnimationBatch(null);

    // redirect after animation
    if (pendingNavigation) {
      router.push(pendingNavigation, { scroll: false });
    }
  };

  // reset pending navigation and isAnimating after redirect
  useEffect(() => {
    if (pendingNavigation && pathname === pendingNavigation) {
      setPendingNavigation(null);
      setIsAnimating(false);
    }
  }, [pathname, pendingNavigation]);

  // animation variants
  const contentVariants = {
    enter: () => ({
      x:
        direction === "left"
          ? `calc(100vw - ${pages.length * 6}rem)`
          : `calc(-100vw + ${pages.length * 6}rem)`,
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x:
        direction === "left"
          ? `calc(-100vw + ${pages.length * 6}rem)`
          : `calc(100vw - ${pages.length * 6}rem)`,
      opacity: 1,
    }),
  };

  return (
    <div className="hidden lg:block relative w-screen h-screen overflow-hidden">
      {/* Left side tabs */}
      <div className="absolute left-0 top-0 h-full flex flex-row z-30">
        {leftTabs.map((index) => (
          <motion.button
            key={pages[index].id}
            onClick={() => handleTabClick(index)}
            disabled={isAnimating}
            className={`w-24 h-full flex items-center justify-center cursor-pointer select-none
              ${
                index === activeIndex ? "bg-gray-500 text-white" : "bg-gray-200"
              }
            `}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              fontSize: "1.2rem",
              letterSpacing: "2px",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {pages[index].label}
          </motion.button>
        ))}
      </div>

      {/* Right side tabs */}
      <div className="absolute top-0 h-full flex flex-row z-30 right-0">
        {rightTabs.map((index) => (
          <motion.button
            key={pages[index].id}
            onClick={() => handleTabClick(index)}
            disabled={isAnimating}
            className="w-24 h-full flex items-center justify-center cursor-pointer select-none bg-gray-200"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              fontSize: "1.2rem",
              letterSpacing: "2px",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {pages[index].label}
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
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-0 w-full h-full flex items-center justify-center bg-white"
          >
            {/* Content */}
            <div className="absolute flex-1 flex items-center justify-center w-full">
              {pages[activeIndex]?.content}
            </div>

            {/* Tab indicators */}
            {(direction === "right"
              ? animationBatch?.tabIndices.slice().reverse()
              : animationBatch?.tabIndices
            )?.map((tabIndex, index) => (
              <div
                key={pages[tabIndex].id}
                className={`absolute top-0 h-full w-24 flex items-center justify-center       
                  ${
                    animationBatch?.direction === "left" &&
                    index === animationBatch.tabIndices.length - 1
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200"
                  }`}
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
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
                {pages[tabIndex].label}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
