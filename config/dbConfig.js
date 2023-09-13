const mongoose = require("mongoose");


// mongoose.connect("mongodb+srv://ponmurugan_2001:Ponmurugan4177@cluster0.m3tnf9m.mongodb.net/OrangeBus")
mongoose.connect(process.env.MONGO_URL)


const connection=mongoose.connection
connection.on('connected',()=>{
    console.log('connection Successfully established')
})
connection.on('error',(error)=>{
    console.log('Connection error: ' , error)

})

// module.exports = mongoose