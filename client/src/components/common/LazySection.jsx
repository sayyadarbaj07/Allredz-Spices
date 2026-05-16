import React, { useRef, useMemo } from "react";
import { useInView } from "framer-motion";

/**
 * LazySection Wrapper
 * Only renders its children when they enter the viewport.
 * Helps reduce initial DOM size and improves scroll performance.
 */
const LazySection = ({ children, height = "400px", offset = "300px" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: `0px 0px ${offset} 0px` 
  });

  const style = {
    minHeight: height,
    width: "100%",
    position: "relative",
  };

  return (
    <div ref={ref} style={style}>
      {isInView ? children : null}
    </div>
  );
};

export default React.memo(LazySection);



