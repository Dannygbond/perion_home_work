import AdSlot from "../../components/AdSlot/AdSlot";
import Box from "../../components/Box/Box";
import Tag from "../../components/Tag/Tag";
import Typography from "../../components/Typography/Typography";

export default function Article({
  title,
  image,
  date,
  author,
  content,
  onAdClick,
}) {
  const textStyle = {
    width: "100%",
  };

  return (
    <>
      <img src={image} alt={title} width={"100%"} height={"255px"} />
      <Box style={{ maxWidth: "750px", margin: "auto" }}>
        <Box
          width="100%"
          style={{ justifyContent: "space-between" }}
          isResponsive={false}
          isHorizontal
        >
          <Tag variant="subtitle2">{author}</Tag>
          <Tag variant="subtitle2">{date}</Tag>
        </Box>

        <Typography style={textStyle} variant="h2">
          {title}
        </Typography>
        <AdSlot type="leaderboard" onClick={onAdClick} />

        {content.map(({ type, content }, idx) =>
          idx && idx / 6 === Math.floor(idx / 6) ? (
            <>
              <Typography key={idx} style={textStyle} variant={type}>
                {content}
              </Typography>
              <AdSlot key={idx + "c"} type="leaderboard" onClick={onAdClick} />
            </>
          ) : (
            <Typography style={textStyle} key={idx} variant={type}>
              {content}
            </Typography>
          )
        )}
      </Box>
    </>
  );
}
