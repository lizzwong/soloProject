const mongoose = require('mongoose');

const Schema = mongoose.Schema

InventorySchema = new mongoose.Schema(
    {
        type: { type: String, required: true },
        item: { type: String, required: true },
        description: { type: String, required: true },
        notes: { type: String, required: false },
    }
)

const InventoryItem = mongoose.model('InventoryItem', InventorySchema, )

module.exports = InventoryItem;
