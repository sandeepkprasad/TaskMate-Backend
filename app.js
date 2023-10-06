const express = require("express");
const connectDB = require("./db");
const cors = require("cors");

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

// Available routes
app.use("/auth", require("./routes/auth"));
app.use("/task", require("./routes/task"));

// Listening on PORT 5000.
app.listen(PORT, () => {
  console.log(`TaskMate is running on PORT : ${PORT}`);
});
