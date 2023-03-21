const mongoose = require('mongoose')
const participant = require('../models/participant')
const {NotFoundError, BadRequestError} = require('../utils/errors')
const danceClass = require('../models/danceClass')


exports.addNewDancerToClass = async (req, res, next) => {
  try {
    
    const { name, email, dance, danceRole,} = req.body
    let danceClassId

      if (!name || !email || !dance || !danceRole) 
        throw new BadRequestError ('You have to fill all the information above.')
    
    try {
      danceClassId = await danceClass.findById(dance)
    } catch (error) {
      console.error(error);
      return res.status(400).json ({
        message: 'This dance class does not exist.'
        });
    }
      
      
      const totalDancersInClass = await participant.countDocuments({ dance: dance, danceRole: danceRole });

        if (danceRole === "LEAD" && totalDancersInClass >= 10)
          throw new BadRequestError ('Sorry! There is no more lead role available for this class. The maximum is 10 per class.') 

        if (danceRole === "FOLLOW" && totalDancersInClass >= 10) 
          throw new BadRequestError ('Sorry! There is no more follow role available for this class. The maximum is 10 per class.') 
      

      const paymentStatus = "pending"
      const NewParticipant = await participant.create({
        name, email, dance, danceRole, paymentStatus
      });

      danceClassId.participants.push(NewParticipant._id);
      await danceClassId.save()
      res.json(NewParticipant)  
      
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message});
  }

};


exports.updateDancer = async (req, res, next) => {
  try {
    const dancerId = req.params.dancerId
    let {email, paymentStatus} = req.body

    const dancerUpdate = await participant.findById(dancerId);

    if (email) {
      dancerUpdate.email = email
    };
    if (paymentStatus) {
      dancerUpdate.paymentStatus = paymentStatus
    };

    const updatedDancer = await dancerUpdate.save()
    return res.json(updatedDancer);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteDancerFromClass = async (req, res, next) => {
    const dancerId = req.params.dancerId
    const {danceClassId} = req.body
    console.log(dancerId,danceClassId )
  
  try {
      const deleteDancerFromClassTest = await danceClass.findByIdAndUpdate(
      danceClassId,{
        $pull:{
          participants:dancerId
        }
      },
      {
        new: true
      }
    )

    const deleteDancare = await participant.findOneAndDelete(
      dancerId 
    );
    return res.json(deleteDancare);
  
  }catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};





