import "./style.css";

export default function Tag({ children, color }) {
  const style = color
    ? {
        color: "#fff",
        backgroundColor: color,
      }
    : undefined;
  return (
    <div className="tag" style={style}>
      {children}
    </div>
  );
}
