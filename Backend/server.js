const express = require("express");
const {connect} = require("./config/db");
const foodPlacesRoutes = require("./Routes/foodPlacesRoutes");
const app = express();
const port = process.env.PORT

connect().then(response=>{
  app.get('/',(req,res)=>{
    res.send(response)
  })
}).catch(response=>{
  app.get('/',(req,res)=>{
    res.send(response)
  })
})

app.use("/api/foodPlaces",foodPlacesRoutes)

app.listen(port, () => {
  console.log(`App is running on PORT: ${port}`)
});


