import Box from "../../../components/Box/Box";
import Tag from "../../../components/Tag/Tag";
import Card from "../../../components/Card/Card";
import Typography from "../../../components/Typography/Typography";
import shareIcon from "../../../assets/share.png";
import viewIcon from "../../../assets/eye.png";
import commentsIcon from "../../../assets/typing.png";
import { useTheme } from "../../../hooks/useTheme";
import useNavigation from "../../../hooks/useLocation";
import "./style.css";
export default function BlogCard({
  id,
  title,
  description,
  author,
  date,
  comments,
  views,
  shares,
}) {
  const { currentTheme } = useTheme();
  const { changeHash } = useNavigation();

  const handleOnArticleClick = () => changeHash(id);

  const panelTextStyle = {
    marginBottom: 0,
    marginInlineEnd: "10px",
  };

  const mainTextStyle = {
    paddingInlineStart: "10px",
  };

  const boxStyle = {
    justifyContent: "end",
    alignItems: "center",
    gap: "5px",
  };

  const imageStyle = {
    filter:
      "invert(61%) sepia(9%) saturate(477%) hue-rotate(169deg) brightness(101%) contrast(87%)",
  };

  return (
    <Card className="blogCard" onClick={handleOnArticleClick}>
      <Box
        isResponsive={false}
        height="fit-content"
        isHorizontal
        style={{ justifyContent: "space-between" }}
      >
        <Tag color={currentTheme.primary}>{author}</Tag>
        <Tag>{date}</Tag>
      </Box>
      <Typography style={mainTextStyle} variant={"h6"}>
        {title}
      </Typography>
      <Typography style={mainTextStyle} variant={"subtitle2"}>
        {description}
      </Typography>
      <Box isHorizontal style={boxStyle} isResponsive={false}>
        <img
          src={commentsIcon}
          alt="comments"
          width={"16px"}
          style={imageStyle}
        />
        <Typography style={panelTextStyle} variant={"subtitle2"}>
          {comments}
        </Typography>
        <img src={viewIcon} alt="views" width={"16px"} style={imageStyle} />
        <Typography style={panelTextStyle} variant={"subtitle2"}>
          {views}
        </Typography>
        <img src={shareIcon} alt="shares" width={"16px"} style={imageStyle} />
        <Typography style={panelTextStyle} variant={"subtitle2"}>
          {shares}
        </Typography>
      </Box>
    </Card>
  );
}
