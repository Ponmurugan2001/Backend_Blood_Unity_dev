const mongoose = require("mongoose");

const totalinventorySchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: [true, "blood group is required"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      required: [true, "blood quantity is required"],
    },
    organisation: {
      type: String,
      ref: "User",
      required: [true, "organisation is required"],
    },
    organisationName:{
      type: String,
      
      required: [true, "organisation is required"],

    },
    phoneNumber: {
      type: String,
      required: [true, "Name required"],
    },
   
    email: {
      type: String,
      required: [true, "email is required"],
    },
    Address:{
      type: String,
      required: [true, "Address required "],

    },
    location: {
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
        "Virudhunagar",
      ],
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("TotalInventory", totalinventorySchema);
