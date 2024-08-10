import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

const PORT = 6969;
const Blog = require("./models/blog.model");
// const DATABASE_URL = import.meta.env.DATABASE_URL;

// console.log("in index.ts DATABASE_URL", DATABASE_URL)

mongoose
  .connect(
    "mongodb+srv://akshaysprabhakar:v0kg6ckZCIABK8gH@knowledge-dump.ji3kq.mongodb.net/?retryWrites=true&w=majority&appName=Knowledge-Dump"
  )
  .then(() => console.log("connected to database"))
  .catch(() => console.log("connection failed"));

app.get("/blogs", async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.status(200).json(allBlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/blog/:id", (req, res) => {
  // edit your blog
});

app.delete("/blog/:id", (req, res) => {
  // delete your blog
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
