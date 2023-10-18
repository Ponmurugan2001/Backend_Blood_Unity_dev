const express = require("express");
const {getAllSuccessfulDonations,getsuccessfullDonationByDonorId} = require("../controllers/successfullDonationContoller");
const router = express.Router();


router.get("/getsuccessfullDonation/:DonorId",getsuccessfullDonationByDonorId);
router.get("/getAllSuccessfulDonations",getAllSuccessfulDonations);

module.exports = router;