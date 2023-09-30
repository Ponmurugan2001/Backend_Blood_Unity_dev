const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Name required"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is require"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    Age: {
      type: Number,
      require: [true, "blood quanity is require"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
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

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "donor required"],
    },

    Availability: {
      type: String,
      required: [true, "Availability Required"],
      enum: ["Available","NotAvailable"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DonorProfile", donorSchema);
