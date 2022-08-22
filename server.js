const express = require("express");
const studentRoutes = require("./src/students/routes");
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Building REST API with grasql");
});

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
