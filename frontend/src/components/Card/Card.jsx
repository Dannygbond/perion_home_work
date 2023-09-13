import "./style.css";
export default function Card({
  children,
  className,
  style,
  width,
  height,
  onClick,
  isFlat,
  bgColor,
}) {
  return (
    <div
      className={`card ${className}`}
      onClick={onClick}
      style={{
        width: width,
        height: height,
        cursor: onClick ? "pointer" : "default",
        backgroundColor: bgColor ? bgColor : "transparent",
        boxShadow: isFlat
          ? "none"
          : " rgba(140, 152, 164, 0.25) 0px 3px 6px 0px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
