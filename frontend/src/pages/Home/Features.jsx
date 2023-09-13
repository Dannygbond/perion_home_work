import React from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import Box from "../../components/Box/Box";
import Typography from "../../components/Typography/Typography";
import { features } from "./content";
import tech from "../../assets/tech.svg";
import Card from "../../components/Card/Card";
import IconWithText from "./components/IconWithText";
import AdSlot from "../../components/AdSlot/AdSlot";

export default function Features({ onButtonClick, onAdClick }) {
  const iconWithTextStyle = {
    alignItems: "start",
    textAlign: "start",
    padding: "10px",
  };

  const boxStyle = {
    justifyContent: "center",
    flexDirection: "row",
    flexFlow: "wrap",
  };

  const adBoxStyle = {
    gap: "10px",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <>
      <Container
        style={{ textAlign: "center", alignItems: "center", gap: "20px" }}
      >
        <Box width={"80%"}>
          <Typography variant={"subtitle"}>{features.title}</Typography>
          <Typography variant={"h2"} style={{ marginTop: 0 }}>
            {features.subtitle}
          </Typography>
          <Typography variant={"subtitle2"}>{features.subtitle2}</Typography>
        </Box>
        <Button onClick={onButtonClick}>{features.button1}</Button>
        <Box isHorizontal style={adBoxStyle}>
          <AdSlot type="mediumRectangle" onClick={onAdClick} />
          <AdSlot type="mediumRectangle" onClick={onAdClick} />
          <AdSlot type="mediumRectangle" onClick={onAdClick} />
        </Box>
        <img width={"80%"} src={tech} alt="alian technologies" />
        <Box style={boxStyle}>
          {features.cards.map((card, idx) => (
            <Card width={"350px"} height={"215px"} key={idx}>
              <IconWithText
                style={iconWithTextStyle}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </Card>
          ))}
        </Box>
        <AdSlot type="leaderboard" onClick={onAdClick} />
      </Container>
    </>
  );
}
