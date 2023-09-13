import { useMemo } from "react";
import Container from "../../components/Container/Container";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Article from "./Article";
import Articles from "./Articles";
import { articles } from "./content.js";

export default function Blog({ id, onAdClick }) {
  const article = useMemo(
    () => id && articles.find((article) => article.id === +id),
    [id]
  );

  return (
    <>
      <Header />
      <Container>
        {article ? (
          <Article {...article} onAdClick={onAdClick} />
        ) : (
          <Articles articles={articles} onAdClick={onAdClick} />
        )}
      </Container>
      <Footer />
    </>
  );
}
