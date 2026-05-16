import React, { useRef, useMemo } from "react";
import { useInView } from "framer-motion";

/**
 * LazySection Wrapper
 * Only renders its children when they enter the viewport.
 * Helps reduce initial DOM size and improves scroll performance.
 */
const LazySection = ({ children, height = "400px" }) => {
  const ref = useRef(null);
  
  // Use CSS-based lazy rendering (content-visibility) which is much more stable 
  // for scroll performance and layout consistency than JS-based conditional rendering.
  const style = {
    contentVisibility: "auto",
    containIntrinsicSize: `auto ${height}`,
    minHeight: height,
    width: "100%",
  };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
};

export default React.memo(LazySection);


