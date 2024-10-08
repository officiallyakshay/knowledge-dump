import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { SelectedArticle } from "./SelectedArticle";
import { Link as ReactRouterLink } from "react-router-dom";
import { Flex, Link, useColorModeValue, Box } from "@chakra-ui/react";

const App = () => {
  const linkHoverColor = useColorModeValue("purple.600", "purple.300");

  return (
    <>
      <Flex
        p="4"
        justifyContent="center"
        bg={useColorModeValue("purple.600", "gray.800")}
        boxShadow="md"
        borderBottom="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        mb="6"
      >
        <Link
          as={ReactRouterLink}
          to="/"
          fontSize="3xl"
          fontWeight="bold"
          color={useColorModeValue("white", "purple.300")}
          _hover={{ color: linkHoverColor, textDecoration: "none" }}
        >
          Knowledge Dump
        </Link>
      </Flex>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<SelectedArticle />} />
        <Route path="/author/:username" element={<SelectedArticle />} />
      </Routes>
    </>
  );
};

export default App;
