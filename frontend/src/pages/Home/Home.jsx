import React from "react";
import Container from "../../components/Container/Container";
import Banner from "./Banner";
import Info from "./Info";
import Features from "./Features";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useNavigation from "../../hooks/useLocation";

export default function Home({ onAdClick }) {
  const { changeHash } = useNavigation();

  const handleOnClick = () => changeHash("blog");

  return (
    <>
      <Header />
      <Container isFullScreen style={{ gap: "50px" }}>
        <Banner onButtonClick={handleOnClick} onAdClick={onAdClick} />
        <Info onButtonClick={handleOnClick} />
        <Features onButtonClick={handleOnClick} onAdClick={onAdClick} />
      </Container>
      <Footer />
    </>
  );
}
