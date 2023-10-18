const express = require("express");
const {createTotalInventory,gettotalInventory} = require("../controllers/totalInventeryController");
const router = express.Router();


router.post("/create-Totalinventory", createTotalInventory);
router.get("/get-Totalinventory", gettotalInventory);

module.exports = router;