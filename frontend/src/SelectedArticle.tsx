import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const SelectedArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [article, setArticle] = useState<any>({});

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:6969/blog/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <>
      <Flex
        flexDir="column"
        p="6"
        borderRadius="lg"
        alignItems="center"
        mx="auto"
        maxW={{ base: "95%", md: "80%", lg: "60%" }}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="2xl"
        mt="8"
      >
        <Box w="100%" textAlign="left">
          <Button
            onClick={() => navigate(-1)} // Go back to the previous page
            colorScheme="purple"
            mb="4"
            variant="outline"
          >
            Back
          </Button>
          <Heading
            as="h1"
            size="2xl"
            mb="4"
            color={useColorModeValue("purple.800", "purple.200")}
          >
            {article.heading || "Loading..."}
          </Heading>
          <Flex alignItems="center" mb="4">
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.500", "gray.400")}
            >
              {article.author || "Unknown Author"}
            </Text>
            <Text mx="2" color={useColorModeValue("gray.500", "gray.400")}>
              ·
            </Text>
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.500", "gray.400")}
            >
              {article.date
                ? new Date(article.date).toLocaleDateString("en-us", {
                    month: "long",
                    day: "numeric",
                  })
                : "Unknown Date"}
            </Text>
          </Flex>
          <Text fontSize="lg" color={useColorModeValue("gray.700", "gray.300")}>
            {article.content || "Article content will appear here."}
          </Text>
        </Box>
      </Flex>
    </>
  );
};
