import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { SelectedArticle } from "./SelectedArticle";
import { Link as ReactRouterLink } from "react-router-dom";
import { Flex, Link, Text } from "@chakra-ui/react";

const App = () => {
  return (
    <>
      <Flex p="4">
        <Link as={ReactRouterLink} to="/" _hover={{ color: "grey" }}>
          <Text>Knowledge Dump</Text>
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
