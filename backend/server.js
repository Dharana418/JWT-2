// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const dbUrl = "mongodb+srv://thiyunuwan567_db_user:GoM2BFzdAHTW5ypw@cluster0.ykivjkk.mongodb.net/UsersDB?retryWrites=true&w=majority&authSource=admin";

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("✅ Server running on port 3000 and connected to MongoDB");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
});
app.use(bodyParser.json());
app.use(cors());

