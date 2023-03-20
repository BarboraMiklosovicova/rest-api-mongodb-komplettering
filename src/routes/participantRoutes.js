const express = require('express')
const router = express.Router()
const {
  addNewDancerToClass,
  updateDancer,
  deleteDancerFromClass,
} = require('../controllers/participantControllers')

router.post('/addNewDancerToClass', addNewDancerToClass)
router.put('/:dancerId', updateDancer)
router.delete('/:dancerId', deleteDancerFromClass)

module.exports = router