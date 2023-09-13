import React, { useState, useEffect, createContext, useContext } from "react";

const colors = {
  primary: "#F47C00",
  secondary: "#B2E1E9",
  tertiary: "#E9E5BD",
  accent: "#FDD726",
  danger: "#F44336",
  success: "#4CAF50",
  warning: "#FFC107",
  background2: "#f7f9fc",
};

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const lightTheme = {
    ...colors,
    text: "rgb(45, 55, 72)",
    background: "#fff",
  };

  const darkTheme = {
    ...colors,
    text: "#fff",
    background: "#333",
    background2: "#4a4949",
  };

  const themeTypes = {
    light: "light",
    dark: "dark",
  };

  const currentTheme = theme === themeTypes.light ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === themeTypes.light ? themeTypes.dark : themeTypes.light
    );
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
