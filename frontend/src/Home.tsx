import { Box } from "@chakra-ui/react";
import { ArticleForm } from "./ArticleForm";
import { ListOfArticles } from "./ListOfArticles";
import { useState } from "react";

export const Home = () => {
  const [reloadArticles, setReloadArticles] = useState(false);

  const handleArticleSubmitSuccess = () => {
    setReloadArticles(!reloadArticles);
  };

  return (
    <Box p="4">
      <ArticleForm onSubmitSuccess={handleArticleSubmitSuccess} />
      <ListOfArticles reload={reloadArticles} />
    </Box>
  );
};

export default Home;
