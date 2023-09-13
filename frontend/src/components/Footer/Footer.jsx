import React from "react";
import "./style.css";

export default function Footer() {
  return (
    <footer className="footer">
      <hr className="divider" />
      <p className="disclaimer">
        Disclaimer: This is a sample website for demonstration purposes only.
        All rights reserved.
      </p>
      <p className="copyright">
        &copy; {new Date().getFullYear()} Daniel Gushkan. All rights reserved.
      </p>
    </footer>
  );
}
