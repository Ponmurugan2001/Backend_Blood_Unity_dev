const express= require('express');

const userRouter=require("./routes/routesUser")
const inventoryRouter=require("./routes/inventoryRoutes")
const analyticsRouter= require("./routes/analyticsRoutes")
const donarProfile=require("./routes/donorProfile")
const recipientProfile=require("./routes/recipientProfile")
const TotalInventory=require("./routes/Totalinventory")
const successDonation=require("./routes/successfullDonationRoutes")
const cors = require('cors');



const app= express();
require('dotenv').config();
const dbconfig =require("./config/dbConfig")
app.use(express.json())

  
  app.use(cors());  

// http://localhost:9000/api/user/register
app.use('/api/user',userRouter)
app.use('/api/user/profile',donarProfile)
app.use('/api/user/recipient/profile',recipientProfile)
app.use('/api/user/inventory',inventoryRouter)
app.use('/api/user/Totalinventory',TotalInventory)
app.use("/api/user/analytics", analyticsRouter);
app.use("/api/user/successfull",successDonation)
app.get("/",(req,res)=>{
    res.send("welcome to backend")
});

app.listen(9000,()=>{console.log("The port is listening on 9000")});