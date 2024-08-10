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
const DATABASE_URL = process.env.DATABASE_URL;
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
app.put("/blog/:id", (req, res) => {
    // edit your blog
});
app.delete("/blog/:id", (req, res) => {
    // delete your blog
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
