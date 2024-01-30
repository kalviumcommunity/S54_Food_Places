const express = require("express");
const app = express();


app.route("/ping").get((req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log(`App is running on PORT: 3000`);
});
