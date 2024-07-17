const Exam = require('../models/ExamModel.js');
const Mask = require('../models/MaskModel.js');
const User = require('../models/userModel.js');
const fs = require('fs');
const path = require('path');
const HttpError = require('../models/errorModel.js');
const generateExamAndMask = require('../middleware/generatingMiddleware.js');


//optional - ask the instructor if he will back for the correction 

// POST , api/masks/exam/:id , protected
const createMask = async (req,res,next) => {
    try {
        console.log(req.params.id)
        const examID = req.params.id
        const currentExam = await Exam.findById(examID)
        const name = currentExam.name
        const MCQs = currentExam.MCQs
        const TFs = currentExam.TFs
        const Text = currentExam.Text
        const textLines= currentExam.textLines
        const examCode= currentExam.examCode
        if(!name){
            return next(new HttpError("The Exam is Not Found." , 400));
        }
        const maskExists = await Mask.findOne({name: name,instructor: req.user.name});
        if(maskExists) {
            return next(new HttpError('The Mask is already Generated or Try a new Name for your Exam.',400));
        }

        await generateExamAndMask(req.user.name ,name , MCQs , TFs , Text , textLines ,examCode, true);
        
        const newMask = await Mask.create({name , MCQs , TFs , Text , instructor: req.user.name , creator: req.user.id ,maskPdfFile:`Mask-${req.user.name}-${name}-MCQs${MCQs}TFs${TFs}Text${Text}.pdf`, exam:examID })
        if(!newMask){
            return next(new HttpError('Mask could not be created.', 400))
        }

        const currentUser = await User.findById(req.user.id);// first 
        await currentUser.myMasks.push(newMask._id)
        await currentUser.save()

        await Exam.findByIdAndUpdate(examID,{myMask:newMask.id})

        res.status(200).json(newMask)
        
    } catch (error) {
        return next(new HttpError(error));
    }
}


// Get , api/masks/:id , unprotected  
const getMask = async (req,res,next) => {
    try {
        const maskID = req.params.id;
        const mask = await Mask.findById(maskID)
        if(!maskID){
            return next(new HttpError('Mask not Found.',404));
        }
        res.status(200).json(mask)
    } catch (error) {
        return next(new HttpError(error));
    }
}


// DELETE , api/masks/:id , protected
const deleteMask = async (req,res,next) => {
    try {
        const maskID = req.params.id;
        if(!maskID){
            return next(new HttpError('Mask is unavailable.' , 400));
        }
        const mask = await Mask.findById(maskID);
        const fileName =mask?.maskPdfFile;
        if(req.user.id == mask.creator){
            fs.unlink(path.join(__dirname,'..','MyMasks',fileName),async(err)=>{
                if(err){
                    return next(new HttpError(err))
                } else {
                    await Mask.findByIdAndDelete(maskID);
                    res.status(200).json(`Mask ${maskID} deleted successfully.`)
                }
            })
        } else {
            return next(new HttpError('You can not delete that Mask' , 403));
        }
    } catch (error) {
        return next(new HttpError('Mask can not be deleted' , 403));
    }
}





module.exports = {
    createMask,
    getMask,
    deleteMask
  };