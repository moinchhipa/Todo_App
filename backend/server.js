const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

app.use(
  cors({
    origin: "https://your-site.netlify.app",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rotes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

//MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

//Server Connection
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
