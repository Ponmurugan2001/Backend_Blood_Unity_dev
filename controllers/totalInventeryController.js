const mongoose = require("mongoose");
const TotalInventory = require("../models/totalInventoryModel");

// Create a new totalinventory record
exports.createTotalInventory = async (req, res) => {
  try {
    const { bloodGroup, quantity, organisation, organisationName, phoneNumber, email, Address, location } = req.body;
    const inventoryType = req.body.inventoryType; // Get the inventoryType from the request body

    // Find the existing totalinventory record for the same blood group and organisation
    const existingTotalInventory = await TotalInventory.findOne({ bloodGroup, organisation });

    if (!existingTotalInventory) {
      // If no existing record, create a new one with the provided quantity
      const totalinventory = new TotalInventory({
        bloodGroup,
        quantity: inventoryType === "in" ? quantity : 0,
        organisation,
        organisationName,
        phoneNumber,
        email,
        Address,
        location
      });

      const savedTotalInventory = await totalinventory.save();
      return res.status(201).json({ success: true, data: savedTotalInventory });
    }

    // If an existing record is found, update the quantity based on the inventoryType
    if (inventoryType === "in") {
      existingTotalInventory.quantity += quantity;
    } else if (inventoryType === "out") {
      existingTotalInventory.quantity -= quantity;
    }

    const updatedTotalInventory = await existingTotalInventory.save();
    res.status(200).json({ success: true, data: updatedTotalInventory });
  } catch (error) {
    // Handle the error and include the error message in the response
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ success: false, error: "Internal server error", errorMessage: error.message });
  }
};




// Get all inventory records
exports.gettotalInventory = async (req, res) => {
  try {
    const inventory = await TotalInventory.find();

    if (inventory.length === 0) {
      return res.status(404).json({ error: "No inventory records found" });
    }

    res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
