import React, { useRef, useMemo } from "react";
import { useInView } from "framer-motion";

/**
 * LazySection Wrapper
 * Only renders its children when they enter the viewport.
 * Helps reduce initial DOM size and improves scroll performance.
 */
const LazySection = ({ children, height = "400px", offset = "200px" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: `0px 0px ${offset} 0px` 
  });

  const style = useMemo(() => ({
    minHeight: !isInView ? height : "auto",
    transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    opacity: isInView ? 1 : 0,
    containIntrinsicSize: `auto ${height}`,
    contentVisibility: isInView ? "visible" : "auto",
  }), [isInView, height]);

  return (
    <div ref={ref} style={style}>
      {isInView ? children : null}
    </div>
  );
};

export default React.memo(LazySection);

