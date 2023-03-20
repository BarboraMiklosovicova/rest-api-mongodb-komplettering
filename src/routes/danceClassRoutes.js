const express = require('express')
const router = express.Router()
const {
  getAllDanceClasses,
  getAllActiveClasses,
} = require('../controllers/danceClassContoller')

router.get('/',getAllDanceClasses)
router.get('/activeClasses', getAllActiveClasses) 

module.exports = router


