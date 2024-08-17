"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5174",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
}));
const PORT = 6969;
const Blog = require("./models/blog.model");
// const DATABASE_URL = import.meta.env.DATABASE_URL;
// console.log("in index.ts DATABASE_URL", DATABASE_URL)
mongoose_1.default
    .connect("mongodb+srv://akshaysprabhakar:v0kg6ckZCIABK8gH@knowledge-dump.ji3kq.mongodb.net/?retryWrites=true&w=majority&appName=Knowledge-Dump")
    .then(() => console.log("connected to database"))
    .catch(() => console.log("connection failed"));
app.get("/blogs", async (req, res) => {
    try {
        const allBlogs = await Blog.find();
        res.status(200).json(allBlogs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get("/blog/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.post("/blogs", async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.put("/blog/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndUpdate(id, req.body);
        if (!blog) {
            return res.status(404).json({ message: "Blog Not Found" });
        }
        const updatedBlog = await Blog.findById(id);
        res.status(200).json(updatedBlog);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.delete("/blog/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog Not Found" });
        }
        res.status(200).json({ message: "Blog Deleted Successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
