import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/order.route.js";
import cartRoutes from "./routes/cart.route.js";
import labAdminRoutes from "./routes/admin.route.js";
import superAdminRoutes from "./routes/admin.route.js";
import { protect } from './middlewares/auth.middleware.js';
import labRoutes from "./routes/lab.route.js";
import userRoutes from "./routes/user.route.js";
import queryRoutes from "./routes/query.route.js"
import recommendationRoutes from "./routes/recommendation.route.js"
import paymentRoutes from "./routes/payment.route.js"
import testPackageRoutes from "./routes/testpackage.route.js"
import searchRoutes from "./routes/search.route.js"
import cors from "cors";

//load e variables
dotenv.config();
const app = express();

// CORS Configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie'],
    maxAge: 600,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


//Routes
app.use("/api/auth", userRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/labadmin", labAdminRoutes);
app.use("/api/labs", labRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/tests", testPackageRoutes);
app.use("/api/packages", testPackageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/query", queryRoutes);
app.use('/api/get-recommendation', recommendationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/search", searchRoutes);



// Connect to MongoDB
connectDB();

//server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// Graceful shutdown on SIGTERM
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});



