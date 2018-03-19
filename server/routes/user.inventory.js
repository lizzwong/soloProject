const express = require('expses');
const router = express.Router();
const mongoose = require('mongoose');

InventorySchema = new mongoose.Schema(
    {
        type: { type: String, required: true },
        item: { type: String, required: true },
        description: { type: String, required: true },
        notes: { type: String, required: false },
        user: {type: String, required: true}
    }
)

const InventoryItem = mongoose.model('InventoryItem', InventorySchema, 'Inventory')

router.post('/', (request, response) => {
    let newInventoryItem = new InventoryItem (request.body);
    console.log('New inventory item is', request.body);
    newInventoryItem.save((error, savedItem) =>{
        if (error) {
            console.log('Error adding item', error);
            response.sendStatus(500)
        }
        else {
            console.log('Item added');
            response.sendStatus(201);
        }
    })
})



module.exports = router;