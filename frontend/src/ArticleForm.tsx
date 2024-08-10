import {
  Button,
  Flex,
  FormControl,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export const ArticleForm = ({ onSubmitSuccess }: any) => {
  const [fullName, setFullName] = useState("");
  const [heading, setHeading] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const toast = useToast();
  const [writeAnArticle, setWriteAnArticle] = useState(false);

  const handleArticleSubmit = () => {
    const payload = {
      author: fullName,
      heading: heading,
      content: articleContent,
      date: new Date(),
    };
    if (fullName === "" || heading === "" || articleContent === "") {
      toast({
        title: "Form Incomplete",
        description:
          "Field out every field in the form to add to your knowledge dump.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    // const newArticle = axios.post("/blogs", payload);

    axios
      .post("/blogs", payload)
      .then((response) => {
        console.log("response", response);
        onSubmitSuccess();
      })
      .catch((error) => console.error(error));

    setFullName("");
    setHeading("");
    setArticleContent("");
  };

  return (
    <>
      {!writeAnArticle ? (
        <Button
          colorScheme="blue"
          variant="outline"
          size="sm"
          onClick={() => setWriteAnArticle(!writeAnArticle)}
        >
          Add Your Blog
        </Button>
      ) : (
        <Flex>
          <FormControl isRequired onSubmit={handleArticleSubmit}>
            <Input
              placeholder="Full Name"
              size="sm"
              mb="4"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              placeholder="Blog Title"
              size="sm"
              mb="4"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
            <Textarea
              placeholder="Add your blog!"
              value={articleContent}
              onChange={(e) => setArticleContent(e.target.value)}
              size="sm"
              mb="6"
            />
            <Button
              colorScheme="black"
              variant="outline"
              size="sm"
              onClick={handleArticleSubmit}
            >
              Add Your Knowledge Dump
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => setWriteAnArticle(!writeAnArticle)}
              ml="5"
              size="sm"
            >
              Close Form
            </Button>
          </FormControl>
        </Flex>
      )}
    </>
  );
};
