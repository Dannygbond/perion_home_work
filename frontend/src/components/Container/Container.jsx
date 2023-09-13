import "./style.css";

export default function Container({
  children,
  isFullScreen,
  style,
  className,
}) {
  const extraStyle = isFullScreen
    ? { maxWidth: "100%", padding: 0, ...style }
    : style;
  return (
    <div className={`container ${className || ""}`} style={extraStyle}>
      {children}
    </div>
  );
}
