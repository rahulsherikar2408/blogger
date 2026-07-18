# 📝 Blogger

A modern **full-stack blogging platform** built with **Node.js, Express.js, MongoDB, EJS, and Cloudinary**. Users can create an account, publish blogs with cover images, browse articles, and interact through comments. Images are securely stored using Cloudinary while authentication is handled with JWT stored in HTTP-only cookies.

---

## 📸 Preview

| Home Page | Blog Page |
|-----------|-----------|
| ![Home](screenshots/home.png) | ![Blog](screenshots/blog.png) |

---

# ✨ Features

- 🔐 User Authentication (Sign Up / Sign In / Logout)
- 🔑 JWT Authentication using HTTP-only Cookies
- 📝 Create and Publish Blogs
- ☁️ Upload Blog Cover Images to Cloudinary
- 📖 Read Blogs
- 💬 Comment on Blogs
- 👤 View Your Published Blogs
- 📱 Responsive Bootstrap UI
- 🔒 Password Hashing using Crypto
- 🎨 Server-side Rendering using EJS
- 📂 Image Organization in Cloudinary by User

---

# 🛠 Tech Stack

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- EJS

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Token (JWT)
- Cookie Parser

### Image Storage

- Cloudinary
- Multer
- Multer Storage Cloudinary

---

# 📁 Project Structure

```
Blogger/
│
├── middlewares/
│   ├── authentication.js
│   └── cloudinaryUpload.js
│
├── models/
│   ├── blog.js
│   ├── comment.js
│   └── user.js
│
├── public/
│
├── routes/
│   ├── blog.js
│   └── user.js
│
├── services/
│   ├── authentication.js
│   └── cloudinary.js
│
├── views/
│   ├── partials/
│   ├── home.ejs
│   ├── blog.ejs
│   ├── addBlog.ejs
│   ├── myBlogs.ejs
│   ├── signin.ejs
│   └── signup.ejs
│
├── index.js
├── package.json
└── .env
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/rahulsherikar2408/blogger.git
```

Go into the project

```bash
cd blogger
```

Install dependencies

```bash
npm install
```

Create a `.env` file in the project root.

```env
PORT=8000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the application

```bash
npm start
```

For development

```bash
npm run dev
```

Visit

```
http://localhost:8000
```

---

# 📌 Routes

## User Routes

| Method | Route | Description |
|---------|-------|-------------|
| GET | `/user/signup` | Signup Page |
| POST | `/user/signup` | Register User |
| GET | `/user/signin` | Login Page |
| POST | `/user/signin` | Login User |
| GET | `/user/logout` | Logout |

---

## Blog Routes

| Method | Route | Description |
|---------|-------|-------------|
| GET | `/` | Home Page |
| GET | `/blog/add-new` | Create Blog |
| POST | `/blog` | Publish Blog |
| GET | `/blog/:id` | View Blog |
| POST | `/blog/comment/:blogId` | Add Comment |
| GET | `/blog/my-blogs/:username` | View User Blogs |

---

# 🔐 Authentication

- Passwords are hashed before storing in MongoDB.
- JWT is generated after successful login.
- Token is stored in an **HTTP-only Cookie**.
- Authentication middleware verifies every protected request.

---

# ☁️ Cloudinary Integration

Blog cover images are uploaded directly to Cloudinary.

Images are organized in folders using the logged-in user's ID:

```
blogger/{userId}/
```

This keeps every user's uploaded images separated and organized.

---

# 📦 Dependencies

- express
- mongoose
- ejs
- dotenv
- jsonwebtoken
- cookie-parser
- multer
- cloudinary
- multer-storage-cloudinary

---

# 🔮 Future Improvements

- ❤️ Like Blogs
- 🔍 Search Blogs
- 🏷 Categories & Tags
- 👤 User Profiles
- ✏️ Edit Blog
- 🗑 Delete Blog
- 📑 Rich Text Editor
- 📄 Pagination
- 📊 View Count
- ❤️ Bookmarks
- 🌙 Dark Mode
- 📧 Email Verification
- 🔔 Notifications

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Rahul Sherikar**

- GitHub: https://github.com/rahulsherikar2408
- LinkedIn: https://www.linkedin.com/in/sherikar-rahul-9624a4281

---

⭐ If you found this project useful, consider giving it a star on GitHub.