const express = require("express")
const userRoutes = require("./routes/userRotes")
const app = express()
const cors = require("cors")

app.use(cors({
  origin: "http://localhost:3000",
}))
app.use(express.json());
app.use("/user", userRoutes);
module.exports = app