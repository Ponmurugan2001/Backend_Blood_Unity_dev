const mongoose = require("mongoose");

const  InventoryProfile = new mongoose.Schema(
  {
    OrganisationName: {
      type: String,
      required: [true, "Name required"],
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

    OrganisationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "donor required"],
    },


  },
  { timestamps: true }
);

module.exports = mongoose.model("InventoryProfile", InventoryProfile);
