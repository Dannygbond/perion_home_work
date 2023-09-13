import AdSlot from "../../components/AdSlot/AdSlot";
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Typography from "../../components/Typography/Typography";
import { useTheme } from "../../hooks/useTheme";
import { banner } from "./content";

function BannerWrapper({ children, bgColor }) {
  const wrapperStyle = {
    backgroundColor: bgColor,
    width: "100%",
  };
  return <div style={wrapperStyle}>{children}</div>;
}

export default function Banner({ onButtonClick, onAdClick }) {
  const { currentTheme } = useTheme();

  const bannerStyle = {
    justifyContent: "space-between",
  };

  return (
    <BannerWrapper bgColor={currentTheme.background2}>
      <Container style={bannerStyle}>
        <AdSlot type="leaderboard" onClick={onAdClick} />
        <Box isHorizontal>
          <Box width="40%">
            <Typography variant={"h1"}>{banner.title}</Typography>
            <Typography variant={"subtitle"}>{banner.subtitle}</Typography>
            <Box isHorizontal style={{ gap: "10px" }}>
              <Button onClick={onButtonClick}>{banner.button1}</Button>
              <Button onClick={onButtonClick} variant={"outlined"}>
                {banner.button2}
              </Button>
            </Box>
          </Box>
          <Box>
            <img
              width="100%"
              style={{ mixBlendMode: "multiply" }}
              src={
                "https://img.freepik.com/free-vector/group-people-hugging-each-other-youth-day_23-2148588373.jpg?w=2000"
              }
              alt="group of people hugging each other"
            />
          </Box>
        </Box>
      </Container>
    </BannerWrapper>
  );
}
