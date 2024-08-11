import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ArticleProps } from "./types";
import { Link as ReactRouterLink } from "react-router-dom";
import axios from "axios";

export const ListOfArticles = ({ reload }: any) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/blogs");
        setArticles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
    setLoading(true);
  }, [reload]);

  return (
    <>
      {Array.isArray(articles) && articles.length === 0 && !loading ? (
        <Text mt="5">Loading blogs...</Text>
      ) : (
        <Box mt="5">
          <Box>
            {`${articles.length} ${
              articles.length === 1 ? "blog" : "blogs"
            } available to read`}
          </Box>
          {articles.map((article: ArticleProps) => (
            <Flex
              flexDir="column"
              border="1px solid lightgrey"
              p="4"
              borderRadius="5"
              mt="5"
              key={article._id}
            >
              <Link
                key={article._id}
                as={ReactRouterLink}
                to={`/blog/${article._id}`}
                _hover={{ textDecor: "none" }}
              >
                <Flex flexDir="column" gap="4">
                  <Text>{article.author}</Text>
                  <Heading as="h5" size="md">
                    {article.heading}
                  </Heading>
                  <Text
                    fontSize="sm"
                    textOverflow="ellipsis"
                    maxWidth="100ch"
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >
                    {article.content}
                  </Text>
                  <Text fontSize="xs">
                    {new Date(article.date).toLocaleDateString("en-us", {
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </Flex>
              </Link>
            </Flex>
          ))}
        </Box>
      )}
    </>
  );
};
