import React, { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * LazySection Wrapper
 * Only renders its children when they enter the viewport.
 * Helps reduce initial DOM size and improves scroll performance.
 */
const LazySection = ({ children, height = "400px", offset = "400px" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: `0px 0px ${offset} 0px` 
  });

  return (
    <div 
      ref={ref} 
      style={{ 
        minHeight: !isInView ? height : "auto",
        transition: "opacity 0.5s ease-in-out",
        opacity: isInView ? 1 : 0
      }}
    >
      {isInView ? children : null}
    </div>
  );
};

export default LazySection;
