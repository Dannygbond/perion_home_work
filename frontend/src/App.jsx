import React from "react";
import useNavigation from "./hooks/useLocation";
import useEventTracker from "./hooks/useEventTracker";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";

function App() {
  const { hash } = useNavigation();
  const { trackAdClick } = useEventTracker();

  switch (hash) {
    case "home":
    case "":
      return <Home onAdClick={trackAdClick} />;
    default:
    case "blog":
      return (
        <Blog
          onAdClick={trackAdClick}
          id={hash !== "blog" ? hash : undefined}
        />
      );
    case "dashboard":
      return <Dashboard />;
  }
}

export default App;
