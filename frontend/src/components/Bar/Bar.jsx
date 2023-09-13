import React from "react";
import "./style.css";

export default function Bar({ percent, showOnHover, isHorizontal }) {
  const fillStyle = isHorizontal
    ? {
        height: `${percent}%`,
      }
    : { width: `${percent}%` };

  return (
    <div
      className={`${isHorizontal ? "horizontalB" : "b"}ar`}
      title={showOnHover}
    >
      <div
        className={`${isHorizontal ? "horizontalB" : "b"}arFill`}
        style={fillStyle}
      ></div>
    </div>
  );
}
