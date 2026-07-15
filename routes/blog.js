import {Router} from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import Blog from "../models/blog.js"

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const uploadPath = path.resolve(
            `./public/uploads/${req.user._id}`
        );

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },
    filename: function(req, file, cb){
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({storage: storage});

const router = Router();

router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    });
});

router.post('/', upload.single("coverImage"), async(req, res) => {
    const {title, body } = req.body;
    const blog = await Blog.create({
        title: title,
        body: body,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.user._id}/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
});

export default router;