const express = require('express')
const router = express.Router()

const { getFoodItems } = require('./item-model')

//get all food items by truck id
router.get('/:truckId', (req, res) => {

    const id = Number(req.params.truckId)

    getFoodItems(id)
        .then(items => {
            res.status(200).json({ data: items })
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})



module.exports = router