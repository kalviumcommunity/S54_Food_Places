const express = require("express");
const app = express();

app.route("/ping").get((req, res) => {
  res.send("Hello world, This is ping Route");
});
app.route("/").get((req, res) => {
  res.send("Hello world, This is main Route(/)");
});

app.listen(3000, () => {
  console.log(`App is running on PORT: 3000`);
});
