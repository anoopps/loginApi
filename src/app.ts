import express from "express";

const app = express();

app.use(express.json());

// login router 
import authRoutes from "./modules/auth/authRoutes";

app.get("/", (req, res) => {
    res.json({
        message: "Login API is running"
    });
});

// authRoutes
app.use("/api", authRoutes);

export default app;