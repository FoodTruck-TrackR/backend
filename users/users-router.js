const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const verifyToken = require('../auth/authenticate-middleware')

const { getUserInfo, addTruck, deleteTruck, rateFoodItem } = require('./users-model')



//view the diner's favorite trucks
router.get('/:id', verifyToken(), (req, res) => {

    const id = Number(req.params.id)

    getUserInfo(id)
        .then(user => {
            res.status(200).json({ data: user })
        })
        .catch(err => {
            res.status(500).json({ message: 'There was an error trying to retrieve from the database' })
        })
})

//add new truck to list
router.post('/:id', (req, res) => {

    const id = Number(req.params.id)

    //favorite truck id will be dynamic
    const favTruck = {
        truck_id: Number(req.body['truck_id']),
        user_id: id
    }

    addTruck(favTruck)
        .then(resp => {
            res.status(201).json({ message: 'you have successfully favorited this truck' })
        })
        .catch(error => {
            res.status(500).json({ message: 'there was an error with the database' })
        })
})

//delete favorite truck from list
router.delete('/:id/:favorite_id', (req, res) => {

    const favorite_id = Number(req.params.favorite_id)

    deleteTruck(favorite_id)
        .then(id => {
            if (id) {
                res.status(201).json({ message: 'truck was deleted from your favorites' })
            } else {
                res.status(404).json({ message: 'could not find that truck in your favorites' })
            }
        })
        .catch(error => {
            console.log(error)
        })
})

//rate a food item 
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post('/:userId/:itemId', (req, res) => {
    const newRating = {
        user_id: Number(req.params.userId),
        item_id: Number(req.params.itemId),
        ratings: Number(req.body.ratings)
    }

    rateFoodItem(newRating)
        .then(id => {
            res.status(201).json({ message: 'rating was added' })
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})



module.exports = router