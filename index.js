import 'dotenv/config';

import express from "express";
import path from "path";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import blogRoute from "./routes/blog.js";
import { checkForAuthenticationCookie } from './middlewares/authentication.js';
import Blog from "./models/blog.js";

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();
const port = process.env.PORT || 8000;

// MongoDB Connection
try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected");
} catch (err) {
    console.log("Something went wrong while connecting to MongoDB.");
    console.log(err.message);
}
// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

// Routes
app.get("/", async (req, res) => {
    try {
        const allBlogs = await Blog.find({});
        return res.render("home", {
            user: req.user,
            blogs: allBlogs,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).render("error", {
            title: "Something Went Wrong",
            message: "Unable to connect to the database. Please try again later.",
        });
    }
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(port, () => console.log(`Server started at PORT: ${port}`));
