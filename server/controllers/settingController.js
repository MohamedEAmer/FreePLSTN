const Exam = require('../models/ExamModel.js');
const Settings = require('../models/settingsModel.js');
const User = require('../models/userModel.js');
const HttpError = require('../models/errorModel.js');



// POST , api/settings/exam/:id , protected
const createSetting = async (req,res,next) => {
    try {
        const { number, type, weight, correctAnswer} = req.body
        console.log(req.body)
        if (!number|| !type  || !weight ) {
            return next(new HttpError('Please Make sure to give a Type and a Weight to you Question', 400));
        }
        const examID = req.params.id
        const currentExam = await Exam.findById(examID)
        const name = currentExam.name
        const code = currentExam.examCode
        const totalMarks = currentExam.totalMarks
        const instructor = currentExam.instructor

        if(!name){
            return next(new HttpError("The Exam is Not Found." , 400));
        }

        if (instructor!= req.user.name) {
            return next(new HttpError("Instructor not found." , 400));
        }

        const settingExists = await Settings.findOne({examName: name,examCode:code,instructor: req.user.name});
        if(settingExists) {
            const updatedSettings = await Settings.findByIdAndUpdate(
                settingExists._id,
                { $push: { questions: { number: number, type: type, weight: weight, correctAnswer: correctAnswer } } },
                { new: true }
            );

            res.status(200).json(updatedSettings)
        }else{
            const newSetting = await Settings.create({examName:name ,examCode:code, totalMarks,instructor: req.user.name , creator: req.user.id,
                questions:[{number:number,type:type,weight:weight,correctAnswer:correctAnswer}]
            })
            await Exam.findByIdAndUpdate(examID,{mySettings:newSetting.id})
    
            res.status(200).json(newSetting)
        }


        
    } catch (error) {
        return next(new HttpError(error));
    }
}




// Get , api/settings/:id , protected  
const getSetting = async (req,res,next) => {
    try {
        const settingsId = req.params.id;
        console.logsettingsId
        const settings = await Settings.findById(settingsId)
        if(!settings){
            return next(new HttpError('Settings not Found.',404));
        }
        res.status(200).json(settings)
    } catch (error) {
        return next(new HttpError(error));
    }
}




// PUT, api/settings/:id, protected
const editSetting = async (req, res, next) => {
    try {
        const settingsId = req.params.id;
        const { number, type, weight, correctAnswer } = req.body;
        const settings = await Settings.findById(settingsId);
        if (!settings) {
            return next(new HttpError('Settings not found.', 404));
        }
        const updatedSettings = await Settings.findByIdAndUpdate(
            settingsId,
            { $set: { 'questions.$[elem]': { number, type, weight : weight, correctAnswer : correctAnswer } } },
            {
                new: true,
                arrayFilters: [{ 'elem.number': number, 'elem.type': type }],
            }
        );
        if (!updatedSettings) {
            return next(new HttpError('Question not found for the given number and type.', 404));
        }
        res.status(200).json(updatedSettings);
    } catch (error) {
        return next(new HttpError('Updating settings failed, please try again later.', 500));
    }
};



// DELETE, api/settings/:id, protected
const deleteSetting = async (req, res, next) => {
    try {
        const settingsId = req.params.id;

        const settings = await Settings.findById(settingsId);
        if (!settings) {
            return next(new HttpError('Settings not found.', 404));
        }

        await Settings.findByIdAndDelete(settingsId);

        res.status(200).json({ message: 'Settings deleted successfully.' });
    } catch (error) {
        return next(new HttpError('Deleting settings failed, please try again later.', 500));
    }
};





module.exports = {
    createSetting,
    getSetting,
    editSetting,
    deleteSetting
  };