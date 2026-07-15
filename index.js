import 'dotenv/config';

import express from "express";
import path from "path";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import blogRoute from "./routes/blog.js";
import { checkForAuthenticationCookie } from './middlewares/authentication.js';
import Blog from "./models/blog.js";

const app = express();
const port = process.env.PORT || 8000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL).then((e) => console.log("MongoDB Connected"));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

// Routes
app.get('/', async(req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home', {
        user: req.user,
        blogs: allBlogs,
    });
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(port, () => console.log(`Server started at PORT: ${port}`));
