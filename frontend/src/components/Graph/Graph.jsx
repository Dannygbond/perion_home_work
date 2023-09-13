import React, { useMemo } from "react";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";

const graphVariant = {
  vertical: React.lazy(() => import("./variant/VerticalGraph")),
  horizontal: React.lazy(() => import("./variant/HorizontalGraph")),
};

export default function Graph({
  title,
  subtitle,
  rows,
  columns,
  variant = "vertical",
}) {
  const percentRows = useMemo(
    () => rows?.map((row) => (row / Math.max(...rows)) * 100),
    [rows]
  );

  const GraphContent = useMemo(() => graphVariant[variant], [variant]);

  const mainBoxStyle = {};

  return (
    <Box style={mainBoxStyle} height={"100%"}>
      {title && (
        <Typography style={{ margin: 0 }} variant="subtitle">
          {title}
        </Typography>
      )}
      {subtitle && <Typography variant="subtitle2">{subtitle}</Typography>}
      <Box
        isResponsive={false}
        isHorizontal={variant === "horizontal"}
        height={"100%"}
      >
        {columns.map((column, index) => (
          <GraphContent
            key={index}
            column={column}
            row={rows[index]}
            percent={percentRows[index]}
          />
        ))}
      </Box>
    </Box>
  );
}
