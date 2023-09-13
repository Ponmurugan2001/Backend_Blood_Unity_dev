const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {createDonorProfile,getDonorProfile} = require("../controllers/donorcontroller");

const router = express.Router();

//routes
// ADD INVENTORY || POST
http://localhost:9000/api/v1/inventory/create-inventory
router.post("/create-Donor-Profile",authMiddelware,createDonorProfile);
router.get('/get-Donor-Profile/:donorId',authMiddelware, getDonorProfile);


module.exports = router;
