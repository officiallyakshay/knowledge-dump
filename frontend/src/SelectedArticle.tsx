import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";

export const SelectedArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      const specificArticle = await axios.get(
        `https://knowledge-dump-backend.vercel.app/blog/${id}`
      );
      setArticle(specificArticle.data);
    };

    fetchArticle();
  }, []);

  return (
    <Flex
      flexDir="column"
      p="4"
      borderRadius="5"
      key={article._id}
      alignItems="center"
    >
      <Flex flexDir="column" gap="4">
        <Heading as="h5" size="xl">
          {article.heading}
        </Heading>
        <Flex alignItems="center">
          <Text fontSize="sm">{article.author}</Text>
          <Text ml="2" mr="2">
            ·
          </Text>
          <Text fontSize="sm">
            {new Date(article.date).toLocaleDateString("en-us", {
              month: "long",
              day: "numeric",
            })}
          </Text>
        </Flex>
        <Text fontSize="sm">{article.content}</Text>
      </Flex>
    </Flex>
  );
};
