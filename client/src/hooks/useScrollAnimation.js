import { useReducedMotion } from "framer-motion";

/**
 * useScrollAnimation - Centralized animation variants for a premium look
 * Respects user's prefers-reduced-motion setting
 */
export const useScrollAnimation = () => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Reusable viewport settings for mobile-safe triggering
  const viewportSettings = {
    once: true,
    margin: isMobile ? "-5% 0px -5% 0px" : "-10% 0px -10% 0px", // Less margin on mobile
    amount: isMobile ? "some" : 0.2
  };

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : (isMobile ? 15 : 30) },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.8, // Snappier on mobile
        ease: isMobile ? "easeOut" : [0.16, 1, 0.3, 1] 
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: isMobile ? 0.5 : 1, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.15, // Faster stagger on mobile
        delayChildren: isMobile ? 0.05 : 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : (isMobile ? 0.98 : 0.95) },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: isMobile ? 0.5 : 1, 
        ease: isMobile ? "easeOut" : [0.34, 1.56, 0.64, 1] 
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : (isMobile ? 20 : 50) },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: isMobile ? 0.4 : 0.8, ease: "easeOut" }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : (isMobile ? -20 : -50) },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: isMobile ? 0.4 : 0.8, ease: "easeOut" }
    }
  };

  const clipPathReveal = {
    hidden: { 
      clipPath: isMobile ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)", 
      opacity: 0,
      y: isMobile ? 20 : 0
    },
    visible: { 
      clipPath: "inset(0% 0% 0% 0%)", 
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 0.4 : 1.2, ease: "easeOut" }
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
    shouldReduceMotion,
    isMobile
  };
};
