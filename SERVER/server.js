import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import orderRoutes from "./routes/order.route.js";
import superAdminRoutes from "./routes/superAdmin.route.js";
import labAdminRoutes from "./routes/labAdmin.route.js";
import {protect} from './middlewares/auth.middleware.js';
import labRoutes from "./routes/lab.route.js";
import userRoutes from "./routes/user.route.js";
import queryRoutes from "./routes/query.route.js"
import aiRoutes from "./routes/ai.route.js"
import cartRoutes from "./routes/cart.route.js"
import paymentRoutes from "./routes/payment.route.js"
import testPackageRoutes from "./routes/testpackage.route.js"
import cors from "cors";

//load e variables
dotenv.config();
const app = express();



app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


//Routes
app.use("/api/auth", authRouter);  
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/labadmin", labAdminRoutes);
app.use("/api/labs",  labRoutes);
app.use("/api/tests", testPackageRoutes );
app.use("/api/packages", testPackageRoutes );
app.use("/api/users", userRoutes)
app.use("/api/query", queryRoutes);
app.use("/api/ai", aiRoutes)
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);



// Connect to MongoDB
connectDB();      

//server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})



