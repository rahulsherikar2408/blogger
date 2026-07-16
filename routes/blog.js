import {Router} from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import Blog from "../models/blog.js"
import Comment from "../models/comment.js";

// Multer Disk Storage for uploading Coverimage
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

// My Blogs Route
router.get('/my-blogs/:username', async(req, res) => {
    const blogs = await Blog.find({ createdBy: req.user._id,});
    return res.render('myBlogs', {
        user: req.user,
        blogs,
    })
})

// View Add Blog Page Route
router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    });
});

// View Blog Route
router.get('/:id', async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({blogId: req.params.id}).populate("createdBy");
    return res.render('blog', {
        user: req.user,
        blog,
        comments,
    });
});

// Comment Blog Route
router.post('/comment/:blogId', async(req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId : req.params.blogId,
        createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
});

// Create Blog Route
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