import React from "react";
import "./style.css";
import { useTheme } from "../../hooks/useTheme";

export default function Button({ color, children, onClick, variant }) {
  const { currentTheme } = useTheme();

  const buttonColor = {
    primary: currentTheme.primary,
    secondary: currentTheme.secondary,
    danger: currentTheme.danger,
    success: currentTheme.success,
  };

  const buttonStyle = {
    outlined: {
      color: buttonColor[color] || buttonColor.primary,
      border: `1px solid ${buttonColor[color] || buttonColor.primary}`,
      backgroundColor: "transparent",
    },
    default: {
      backgroundColor: buttonColor[color] || buttonColor.primary,
    },
  };

  return (
    <button
      className={"simpleButton"}
      style={buttonStyle[variant] || buttonStyle.default}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
