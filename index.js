import 'dotenv/config';

import express from "express";
import path from "path";
import mongoose from 'mongoose';

import userRoute from "./routes/user.js";

const app = express();
const port = process.env.PORT || 8000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL).then((e) => console.log("MongoDB Connected"));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

// Routes
app.get('/', (req, res) => {
    res.render('home');
})

app.use('/user', userRoute);

app.listen(port, () => console.log(`Server started at PORT: ${port}`));
