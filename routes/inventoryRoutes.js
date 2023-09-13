const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {createInventoryController,getInventoryController,getAllInventory} = require("../controllers/inventoryController");

const router = express.Router();

//routes
// ADD INVENTORY || POST
http://localhost:9000/api/v1/inventory/create-inventory
router.post("/create-inventory", authMiddelware, createInventoryController);

http://localhost:9000/api/user/inventory/get-inventory
router.get('/get-inventory',authMiddelware, getInventoryController);

router.get('/get-allinventory',authMiddelware,getAllInventory);



module.exports = router;
