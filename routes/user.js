import Router from "express";
import User from "../models/user.js";

const router = Router();

// View Signin Page Route
router.get('/signin', (req, res) => {
    return res.render('signin');
})

// View Signup Page Route
router.get('/signup', (req, res) => {
    return res.render('signup');
})

// Logout Route
router.get('/logout', (req, res) => {
    res.clearCookie("token").redirect('/');
})

// User Login Route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000, // 1 days
                httpOnly: true,
            })
            .redirect("/");

    } catch (error) {
        return res.render('signin', {
            error: "Invalid Email or Password",
        });
    }

})

// User Signup Route
router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/user/signin');
})

export default router;