const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    role: {
        type: String,
        required: [true, "role is required"],
        enum: ["recipient", "organisation", "donor","admin"],
      },
      name: {
        type: String,
        required: function () {
          if (this.role === "recipient" || this.role === "donor") {
            return true;
          }
          return false;
        },
      },
      organisationName: {
        type: String,
        required: function () {
          if (this.role === "organisation") {
            return true;
          }
          return false;
        },
      },
      
      email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "password is requied"],
      },
      isAdmin:{
        type: Boolean,
        default: false
    },
      
     
    },
    {
        timestamps: true,
    })


module.exports=mongoose.model('User',userSchema)