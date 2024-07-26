const express = require("express")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const authroute = require("./Routes/auth.js")
const app = express()
const errorHandler = require("./middleware/errorMiddleware.js");

app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
app.use(errorHandler);
app.use(express.json())
const port = process.env.PORT || 5000
app.get("/",(req,res)=>{
    res.send("working")
})
app.use("/api/auth",authroute)
app.listen(port,async ()=>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
      console.log("connected")
      console.log(`listening on port ${port}....`)
    }).catch(()=>{
      console.log("cannot connect")
    })
})