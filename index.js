import 'dotenv/config';

import express from "express";
import path from "path";

import userRoute from "./routes/user.js";

const app = express();
const port = process.env.PORT || 8000;

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Routes
app.get('/', (req, res) => {
    res.render('home');
})

app.use('/user', userRoute);

app.listen(port, () => console.log(`Server started at PORT: ${port}`));
