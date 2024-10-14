import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.conf.js";
import authRouter from "./routes/Auth.routes.js";
import usersRouter from './routes/Users.routes.js'
dotenv.config();

connectDB();

const app = express();
app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
    methods: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/", usersRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
