import { animate, stagger, text, svg } from "animejs";

export function useAnimations() {
  // 基本淡入動畫
  const fadeIn = (selector, options = {}) => {
    const defaultOptions = {
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeInOutSine",
      delay: 0,
    };

    return animate(selector, { ...defaultOptions, ...options });
  };
  //會員動畫
  const fadeIn2 = (selector, options = {}) => {
    const defaultOptions = {
      translateY: [80, 20],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeInOutSine",
      delay: 0,
    };

    return animate(selector, { ...defaultOptions, ...options });
  };
  //搜尋框動畫
  const searchBoxAnimation = (selector, options = {}) => {
    const defaultOptions = {
      width: ["5px", "50%"],
      minWidth: ["5px", "300px"], // 動畫開始時允許很小，結束時恢復到300px限制
      duration: 1500,
      easing: "easeOutExpo",
      loop: false,
    };

    return animate(selector, { ...defaultOptions, ...options });
  };
  // 文字分割動畫
  const textSplitAnimation = (selector, options = {}) => {
    try {
      const { chars } = text.split(selector, { words: false, chars: true });

      const defaultOptions = {
        y: [
          { to: "-2.75rem", ease: "outExpo", duration: 300 },
          { to: 0, ease: "outBounce", duration: 800, delay: 100 },
        ],
        delay: stagger(50),
        ease: "easeInOutCirc",
        loop: false,
      };

      return animate(chars, { ...defaultOptions, ...options });
    } catch (error) {
      console.error("Text split animation failed:", error);
      return null;
    }
  };

  // 滑入動畫
  const slideIn = (selector, direction = "left", options = {}) => {
    const directions = {
      left: { translateX: [-50, 0] },
      right: { translateX: [50, 0] },
      up: { translateY: [-50, 0] },
      down: { translateY: [50, 0] },
    };

    const defaultOptions = {
      ...directions[direction],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutExpo",
      delay: 0,
    };

    return animate(selector, { ...defaultOptions, ...options });
  };

  // 彈跳動畫
  const bounce = (selector, options = {}) => {
    const defaultOptions = {
      translateY: [
        { to: "-20px", duration: 300, ease: "easeOutQuad" },
        { to: "0px", duration: 300, ease: "easeInQuad" },
      ],
      duration: 600,
      loop: false,
    };

    return animate(selector, { ...defaultOptions, ...options });
  };

  // 縮放動畫
  const scale = (selector, options = {}) => {
    const defaultOptions = {
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 600,
      easing: "easeOutBack",
      delay: 0,
    };

    return animate(selector, { ...defaultOptions, ...options });
  };

  // 延遲執行動畫的輔助函數
  const delayedAnimation = (animationFunction, delay = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = animationFunction();
        resolve(result);
      }, delay);
    });
  };

  return {
    fadeIn,
    fadeIn2,
    searchBoxAnimation,
    textSplitAnimation,
    slideIn,
    bounce,
    scale,
    delayedAnimation,
  };
}
