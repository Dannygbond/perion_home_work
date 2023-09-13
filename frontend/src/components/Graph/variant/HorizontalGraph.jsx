import Bar from "../../Bar/Bar";
import Box from "../../Box/Box";
import Typography from "../../Typography/Typography";

export default function HorizontalGraph({ row, column, percent }) {
  const barBoxStyle = {
    borderRight: "1px dashed #00000010",
    borderLeft: "1px dashed #00000010",
    height: "100%",
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  };
  const boxStyle = {
    height: "20%",
  };
  return (
    <>
      <Box style={barBoxStyle} isResponsive={false}>
        <Bar isHorizontal percent={percent} showOnHover={Math.floor(row)} />
        <Typography style={{ height: "10%", margin: 0 }} variant="subtitle2">
          {column}
        </Typography>
      </Box>
    </>
  );
}
