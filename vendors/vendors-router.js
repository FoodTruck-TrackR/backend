const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const verifyToken = require('../auth/authenticate-middleware')
const verifyUser = require('../auth/authorization-middleware')
const { validateTruck, validateItem } = require('../validation/validation-middleware')

const { getVendorInfo, addOwnedTruck, deleteTruck, addFoodItem, deleteFoodItem } = require('./vendors-model')

//view vendors info
router.get('/:id', verifyToken(), verifyUser(), (req, res) => {

    const id = Number(req.params.id)

    getVendorInfo(id)
        .then(user => {
            res.status(200).json({ data: user })
        })
        .catch(err => {
            res.status(500).json({ message: 'there was a problem retrieving info from db' })
        })
})


//add truck to owned list
router.post('/:id', validateTruck(), verifyToken(), verifyUser(), (req, res) => {

    const vendor_id = Number(req.params.id)

    const newTruck = {
        name: req.body.name,
        location: req.body.location,
        vendor_id
    }

    addOwnedTruck(newTruck)
        .then(id => {
            res.status(201).json({ message: 'truck was added to owned list' })
        })
        .catch(error => {
            res.status(500).json({ message: 'there was a problem adding truck to db' })
        })
})


//delete truck from owned list
router.delete('/:id/:truckId', verifyToken(), verifyUser(), (req, res) => {

    const truck_id = Number(req.params.truckId)

    deleteTruck(truck_id)
        .then(id => {
            if (id) {
                res.status(201).json({ message: 'truck was deleted from the db' })
            } else {
                res.status(404).json({ message: 'no truck with that id exists' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'there was a problem removing truck from db' })
        })

})

//add food item
router.post('/:id/:truckId', validateItem(), verifyToken(), verifyUser(), (req, res) => {
    const newFoodItem = {
        name: req.body.name,
        description: req.body.description,
        photo_url: req.body.photo_url,
        price: req.body.price,
        average_rating: 0,
        truck_id: Number(req.params.truckId)
    }
    addFoodItem(newFoodItem)
        .then(resp => {
            res.status(201).json({ message: 'food item was successfully added to food truck' })
        })
        .catch(error => {
            res.status(500).json({ message: 'There was a problem adding that item to the database', err: error.message })
        })
})

//delete food item 
router.delete('/:id/:truckId/:itemId', verifyToken(), verifyUser(), (req, res) => {

    const foodItemId = Number(req.params.itemId)

    deleteFoodItem(foodItemId)
        .then(id => {
            if (id) {
                res.status(201).json({ message: 'successfully deleted food item' })
            } else {
                res.status(404).json({ message: 'no food item by that id exists' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })

})


module.exports = router