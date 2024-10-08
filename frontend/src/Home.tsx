import { Box, useColorModeValue } from "@chakra-ui/react";
import { ArticleForm } from "./ArticleForm";
import { ListOfArticles } from "./ListOfArticles";
import { useState } from "react";

export const Home = () => {
  const [reloadArticles, setReloadArticles] = useState(false);

  const handleArticleSubmitSuccess = () => {
    setReloadArticles(!reloadArticles);
  };

  return (
    <Box
      p="6"
      mx="auto"
      maxW={{ base: "95%", md: "80%", lg: "70%" }}
      mt="8"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="2xl"
      borderRadius="md"
    >
      <ArticleForm onSubmitSuccess={handleArticleSubmitSuccess} />
      <ListOfArticles reload={reloadArticles} />
    </Box>
  );
};

export default Home;
