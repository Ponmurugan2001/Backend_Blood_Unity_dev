const mongoose = require('mongoose')

const appointmentschema= new mongoose.Schema({

    recipientId:{
        type:String,
        required:true
    },

    donorId:{
        type:String,
        required:true
    },
    recipentInfo:{
        type:Object,
        required:true
    },
    donorInfo:{
        type:Object,
        required:true
    },
    
    status:{
        type:String,
        required: true,
        enum: ["pending", "accepted", "rejected","successfull"],
        default:"pending",
    },

},
{timestamps:true}
)


module.exports = mongoose.model('appointmentmodel',appointmentschema )