const express = require("express");
const {connect} = require("./db")
const app = express();
const port = process.env.PORT

const connectionStatus = connect()
connectionStatus.then(result=>{
  app.route("/").get((req, res) => {
    res.send(result?"Connected to DB":"Disconnected");
  });
  
});

app.route("/ping").get((req, res) => {
  res.send("Hello world, This is ping Route");
});

app.listen(port, () => {
  console.log(`App is running on PORT: ${port}`);
});
