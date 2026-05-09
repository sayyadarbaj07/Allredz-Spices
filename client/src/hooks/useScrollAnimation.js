import { useReducedMotion } from "framer-motion";

/**
 * useScrollAnimation - Centralized animation variants for a premium look
 * Respects user's prefers-reduced-motion setting
 */
export const useScrollAnimation = () => {
  const shouldReduceMotion = useReducedMotion();

  // Reusable viewport settings for mobile-safe triggering
  const viewportSettings = {
    once: true,
    margin: "-10% 0px -10% 0px", // Trigger when 10% in view
    amount: "some"
  };

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] // Custom quintic ease-out
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1, 
        ease: [0.34, 1.56, 0.64, 1] // Slight bounce
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const clipPathReveal = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
    visible: { 
      clipPath: "inset(0% 0% 0% 0%)", 
      opacity: 1,
      transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] }
    }
  };

  return {
    viewportSettings,
    fadeUp,
    fadeIn,
    staggerContainer,
    scaleIn,
    slideInRight,
    slideInLeft,
    clipPathReveal,
    shouldReduceMotion
  };
};
