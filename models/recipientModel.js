const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name required"],
      
    },
    phoneNumber: {
        type: String,
        required: [true, "Name required"],
        
      },
    Age: {
      type: Number,
      require: [true, "blood quanity is require"],
    },
    location:{
        type: String,
      required: [true, "location required"],
      enum: [
        "Ariyalur",
        "Chengalpattu",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kallakurichi",
        "Kanchipuram",
        "Kanyakumari",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Mayiladuthurai",
        "Nagapattinam",
        "Namakkal",
        "Nilgiris",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Ranipet",
        "Salem",
        "Sivaganga",
        "Tenkasi",
        "Thanjavur",
        "Theni",
        "Thoothukudi",
        "Tiruchirappalli",
        "Tirunelveli",
        "Tirupathur",
        "Tiruppur",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Vellore",
        "Viluppuram",
        "Virudhunagar"
      ],
    },
    

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "recipient required"],
    },
   
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("recipientProfile", recipientSchema);
