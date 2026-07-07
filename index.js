import express from "express";
import path from "path";

const app = express();
const PORT = 8000;

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Routes
app.get('/', (req, res) => {
    res.render('home');
})

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
