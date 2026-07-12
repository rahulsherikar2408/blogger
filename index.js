import 'dotenv/config';

import express from "express";
import path from "path";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import { checkForAuthenticationCookie } from './middlewares/authentication.js';

const app = express();
const port = process.env.PORT || 8000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL).then((e) => console.log("MongoDB Connected"));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

// Routes
app.get('/', (req, res) => {
    res.render('home', {
        user: req.user,
    });
});

app.use('/user', userRoute);

app.listen(port, () => console.log(`Server started at PORT: ${port}`));
