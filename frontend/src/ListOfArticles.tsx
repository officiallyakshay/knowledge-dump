import {
  Box,
  Flex,
  Heading,
  Link,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import axios from "axios";

export const ListOfArticles = ({ reload }: any) => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/blogs");
        setArticles(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [reload]);

  if (loading) {
    return (
      <Flex justify="center" align="center" mt="5">
        <Spinner size="lg" />
        <Text ml="4">Loading blogs...</Text>
      </Flex>
    );
  }

  return (
    <Box mt="5">
      {articles.length > 0 ? (
        <>
          <Text mb="4">{`${articles.length} ${
            articles.length === 1 ? "blog" : "blogs"
          } available to read`}</Text>
          {articles.map((article) => (
            <Flex
              key={article._id}
              flexDir="column"
              border="1px solid"
              borderColor={useColorModeValue("gray.200", "gray.600")}
              p="4"
              borderRadius="lg"
              _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
              transition="0.2s"
              mb="6"
            >
              <Link
                as={ReactRouterLink}
                to={`/blog/${article._id}`}
                _hover={{ textDecor: "none" }}
              >
                <Heading as="h5" size="md" mb="2">
                  {article.heading}
                </Heading>
                <Text
                  fontSize="sm"
                  noOfLines={2}
                  color={useColorModeValue("gray.600", "gray.400")}
                >
                  {article.content}
                </Text>
                <Text fontSize="xs" color="gray.500" mt="2">
                  {new Date(article.date).toLocaleDateString("en-us", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              </Link>
            </Flex>
          ))}
        </>
      ) : (
        <Text>No blogs available at the moment. Check back soon!</Text>
      )}
    </Box>
  );
};
