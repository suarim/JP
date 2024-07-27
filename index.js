const express = require("express")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const authroute = require("./Routes/auth.js")
const adminroute = require('./Routes/admin.js')
const userroute = require("./Routes/user.js")
const employeeroute = require("./Routes/employee.js")
const cookieParser = require("cookie-parser")

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
app.use(cookieParser())
const port = process.env.PORT || 5000
app.get("/",(req,res)=>{
    res.send("working")
})
app.use("/api/auth",authroute)
app.use("/api/user",userroute)
app.use("/api/admin",adminroute)

app.use("/api/employee",employeeroute)
app.listen(port,async ()=>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
      console.log("connected")
      console.log(`listening on port ${port}....`)
    }).catch(()=>{
      console.log("cannot connect")
    })
})