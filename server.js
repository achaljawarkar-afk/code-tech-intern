const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let data = [];

app.get("/", (req, res) => {
  res.send("Time Tracker Server is Running");
});

app.post("/save", (req, res) => {
  data.push(req.body);
  res.send({ message: "Data saved" });
});

app.get("/data", (req, res) => {
  res.json(data);
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
