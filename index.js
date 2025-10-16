import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// // Routers
import packageRoutes from "./routes/Package.Routes.js";
import blogRoutes from "./routes/Blogs.Routes.js";
import testimonialRoutes from "./routes/Testimonial.Routes.js";
import leadRoutes from "./routes/Leads.Routes.js";
import userRoutes from "./routes/Users.Routes.js";
import couponRoutes from "./routes/Coupons.Routes.js";
import authRoutes from "./routes/Auth.Routes.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(cookieParser());
app.use(express.json());

// Database connection
const uri = process.env.MONOGO_URI; 
connectDB(uri);


// Default route
app.get("/", (req, res) => {
  res.send("Tour Guide API is running ✅");
});


// API routes
app.use("/api/packages", packageRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/auth", authRoutes);


//Middleware for handling errors:
app.use(notFound);
app.use(errorHandler);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
