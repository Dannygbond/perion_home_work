import React, { useState, useEffect } from "react";
import darkMode from "../../assets/dark-mode.png";
import useNavigation from "../../hooks/useLocation";
import { useTheme } from "../../hooks/useTheme";
import "./style.css";

function Header() {
  const { changeHash, hash } = useNavigation();
  const { toggleTheme, currentTheme, theme } = useTheme();
  const [activeTab, setActiveTab] = useState(hash || "home");
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const handleTabChange = (tab) => {
    changeHash(tab);
    setActiveTab(tab);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > 0 && !isScrollingUp) {
      setIsScrollingUp(true);
    } else if (scrollTop === 0 && isScrollingUp) {
      setIsScrollingUp(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollingUp]);

  const headerClass = isScrollingUp ? "" : "hidden";

  const logoStyles = {
    color: currentTheme.text,
  };

  const linkStyles = {
    color: currentTheme.text,
  };

  const darkModeStyles = {
    filter: theme === "dark" ? "brightness(0) invert(1)" : "none",
    cursor: "pointer",
  };

  return (
    <header className={`header ${headerClass}`}>
      <nav className="navbar">
        <div className="logo" style={logoStyles}>
          TechBlog
        </div>
        <ul className="nav-links">
          <li
            className={activeTab === "home" ? "active" : ""}
            style={linkStyles}
            onClick={() => handleTabChange("home")}
          >
            Home
          </li>
          <li
            className={activeTab === "blog" ? "active" : ""}
            style={linkStyles}
            onClick={() => handleTabChange("blog")}
          >
            Blog
          </li>
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            style={linkStyles}
            onClick={() => handleTabChange("dashboard")}
          >
            Dashboard
          </li>
        </ul>
        <img
          height="30px"
          onClick={toggleTheme}
          src={darkMode}
          style={darkModeStyles}
        />
      </nav>
    </header>
  );
}

export default Header;
