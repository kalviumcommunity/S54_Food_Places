const express = require("express");
const {connect} = require("./config/db");
const foodPlacesRoutes = require("./Routes/foodPlacesRoutes");
const userDataRoutes = require("./Routes/userDataRoutes");
const app = express();
const port = process.env.PORT

app.use(express.json())

connect().then(response=>{
  app.get('/',(req,res)=>{
    res.send(response)
  })
}).catch(response=>{
  app.get('/',(req,res)=>{
    res.send(response)
  })
})

app.use("/api/foodplaces",foodPlacesRoutes)
app.use("/api/userdatas",userDataRoutes)

app.listen(port, () => {
  console.log(`App is running on PORT: ${port}`)
});


