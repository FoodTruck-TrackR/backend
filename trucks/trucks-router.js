const express = require('express')
const router = express.Router()

const { findAllTrucks, findById } = require('./trucks-model')

//view all trucks
router.get('/', (req, res) => {
    findAllTrucks()
        .then(trucks => {
            res.status(200).json({ data: trucks })
        })
        .catch(error => {
            res.status(500).json({ message: 'There was a problem retrieving trucks from db' })
        })
})


//view truck by Id
router.get('/:truckId', (req, res) => {
    const id = Number(req.params.truckId)

    findById(id)
        .then(truck => {
            res.status(200).json({ data: truck })
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})

module.exports = router