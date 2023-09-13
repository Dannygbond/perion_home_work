import React from "react";
import "./style.css";
export default function Box({
  children,
  style,
  width,
  height,
  isHorizontal,
  isResponsive = true,
}) {
  const boxStyle = {
    maxWidth: width,
    height: height,
    flexDirection: isHorizontal ? "row" : "column",
  };

  return (
    <div
      className={`${isResponsive ? "responsiveBox" : ""} box`}
      style={{ ...boxStyle, ...style }}
    >
      {children}
    </div>
  );
}
