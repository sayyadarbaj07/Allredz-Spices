import React from "react";

/**
 * LazySection Wrapper
 * Renders its children statically to prevent dynamic mounting during scroll.
 * Uses CSS content-visibility to defer layout and paint for offscreen elements.
 */
const LazySection = ({ children, height = "400px" }) => {
  const style = {
    contentVisibility: "auto",
    containIntrinsicSize: `auto ${height}`,
    width: "100%",
    position: "relative",
  };

  return (
    <div style={style} className="lazy-section">
      {children}
    </div>
  );
};

export default React.memo(LazySection);




