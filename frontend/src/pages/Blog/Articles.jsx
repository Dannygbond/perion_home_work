import AdSlot from "../../components/AdSlot/AdSlot";
import Box from "../../components/Box/Box";
import Typography from "../../components/Typography/Typography";
import BlogCard from "./components/BlogCard";

export default function Articles({ articles, onAdClick }) {
  return (
    <>
      <AdSlot type="leaderboard" onClick={onAdClick} />
      <Typography variant="h2">Blog</Typography>
      {/* <h1>Maybe Search?</h1> */}
      <Box
        isHorizontal
        style={{
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {articles.map((article, idx) =>
          idx && idx / 4 === Math.floor(idx / 4) ? (
            <>
              <AdSlot key={idx} type="leaderboard" onClick={onAdClick} />
              <BlogCard key={article.title} {...article} />
            </>
          ) : (
            <BlogCard key={article.title} {...article} />
          )
        )}
      </Box>
    </>
  );
}
