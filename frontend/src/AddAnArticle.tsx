import axios from "axios";
import { useState } from "react";

export const AddAnArticle = () => {
  const [fullName, setFullName] = useState("");
  const [heading, setHeading] = useState("");
  const [articleContent, setArticleContent] = useState("");

  const payload = {
    author: fullName,
    heading: heading,
    content: articleContent,
    date: new Date(),
  };
  console.log("payload", payload);
  axios
    .post("/blogs", payload)
    .then((response) => console.log("response", response))
    .catch((error) => console.error(error));

  setFullName("");
  setHeading("");
  setArticleContent("");
};
