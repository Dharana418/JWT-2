import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoute.js";

const app = express();

const dbUrl =
    "mongodb+srv://thiyunuwan567_db_user:GoM2BFzdAHTW5ypw@cluster0.ykivjkk.mongodb.net/UsersDB?retryWrites=true&w=majority&authSource=admin";

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoutes);

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("✅ Server running on port 3000 and connected to MongoDB");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
