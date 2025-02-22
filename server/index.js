const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
}));
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use("/api/users", userRoutes);


mongoose
  .connect("mongodb://localhost:27017/omnicast", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});