import Bar from "../../Bar/Bar";
import Box from "../../Box/Box";
import Typography from "../../Typography/Typography";

export default function VerticalGraph({ row, column, percent }) {
  const boxStyle = {
    gap: "10px",
    alignItems: "center",
    borderTop: "1px dashed #00000010",
    borderBottom: "1px dashed #00000010",
  };
  return (
    <>
      <Box isResponsive={false} isHorizontal style={boxStyle}>
        <Typography style={{ width: "5%", margin: 0 }} variant="subtitle2">
          {column}
        </Typography>
        <Bar percent={percent} showOnHover={Math.floor(row)} />
      </Box>
    </>
  );
}
