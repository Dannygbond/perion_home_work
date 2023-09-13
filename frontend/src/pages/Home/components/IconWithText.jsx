import Typography from "../../../components/Typography/Typography";
import { useTheme } from "../../../hooks/useTheme";
import "./style.css";

export default function IconWithText({ icon, title, description, style }) {
  const { currentTheme } = useTheme();
  return (
    <div className="wrapper" style={style}>
      <div
        className="iconWrapper"
        style={{
          backgroundColor: `${currentTheme.primary}20`,
        }}
      >
        <img width="25px" className="image" src={icon} alt={title} />
      </div>
      <Typography variant={"h4"}>{title}</Typography>
      <Typography variant={"subtitle2"}>{description}</Typography>
    </div>
  );
}
