import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset scroll to top on every route change
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" // Use instant to avoid conflict with smooth scroll during transition
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
