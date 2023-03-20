const DanceClass = require('../models/danceClass')
const {NotFoundError, BadRequestError} = require('../utils/errors')

exports.getAllDanceClasses = async (req, res, next) => {
  
  try {
    const danceClasses = await DanceClass.find();
    if (!danceClasses) {
      throw new NotFoundError('There are no dance classes available')
    }
    res.json(danceClasses)
  }catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
   });
  }
};

exports.getAllActiveClasses = async (req, res, next) => {
  
  try {
    const activeDanceClasses = await DanceClass.find({status: true})

    if (!activeDanceClasses.length) {
      throw new NotFoundError('There are not active dance classes available in this term')
    }
    res.json(activeDanceClasses)
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

