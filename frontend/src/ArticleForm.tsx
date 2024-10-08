import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export const ArticleForm = ({ onSubmitSuccess }: any) => {
  const [fullName, setFullName] = useState("");
  const [heading, setHeading] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra modal control

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
        description: "Please fill out all fields to submit your blog.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    axios
      .post("/blogs", payload)
      .then((response) => {
        console.log("response", response);
        onSubmitSuccess();
        toast({
          title: "Blog Added",
          description: "Your blog has been successfully added!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose(); // Close modal on successful submit
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "An error occurred while submitting the blog.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });

    setFullName("");
    setHeading("");
    setArticleContent("");
  };

  return (
    <>
      <Button colorScheme="purple" variant="solid" size="md" onClick={onOpen}>
        Add Your Blog
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Your Knowledge Dump</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="fullName">Full Name</FormLabel>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  size="md"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="heading">Blog Title</FormLabel>
                <Input
                  id="heading"
                  placeholder="Enter your blog title"
                  size="md"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="articleContent">Content</FormLabel>
                <Textarea
                  id="articleContent"
                  placeholder="Write your blog here..."
                  value={articleContent}
                  onChange={(e) => setArticleContent(e.target.value)}
                  size="md"
                  rows={6}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              variant="solid"
              size="md"
              onClick={handleArticleSubmit}
              mr={4}
            >
              Submit Blog
            </Button>
            <Button variant="outline" size="md" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
