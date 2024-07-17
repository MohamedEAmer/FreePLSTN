const Exam = require('../models/ExamModel.js');
const User = require('../models/userModel.js');
const fs = require('fs');
const path = require('path');
const HttpError = require('../models/errorModel.js');
const generateExamAndMask = require('../middleware/generatingMiddleware.js');




// POST , api/exams , protected
const createExam = async (req,res,next) => {
    try {
        let { name , MCQs , TFs , Text , textLines ,examCode,totalMarks} = req.body;
        if(!name){
            return next(new HttpError("Enter The Exam Name." , 400));
        }
        const examExists = await Exam.findOne({name: name,instructor: req.user.name});
        if(examExists) {
            return next(new HttpError('Try new Name for your Exam.',400));
        }
        const parsedTextLines = JSON.parse(textLines);
        await generateExamAndMask(req.user.name , name , MCQs , TFs , Text , parsedTextLines ,examCode );
        
        const newExam = await Exam.create({name , MCQs , TFs , Text ,textLines:parsedTextLines, examCode ,totalMarks,instructor: req.user.name , creator: req.user.id ,examPdfFile:`${req.user.name}-${name}-MCQs${MCQs}TFs${TFs}Text${Text}.pdf` })
        if(!newExam){
            return next(new HttpError('Exam could not be created.', 400))
        }

        const currentUser = await User.findById(req.user.id);

        await currentUser.myExams.push(newExam._id)
        await currentUser.save()

        const userCourseCount = currentUser.examsNo + 1;
        await User.findByIdAndUpdate(req.user.id, {examsNo:userCourseCount})

        res.status(200).json(newExam )
        
    } catch (error) {
        return next(new HttpError(error));
    }
}






// Get , api/exams/users/id , unprotected  (student)
const getUserExams = async (req,res,next) => {
    try {
        const {id} =req.params;
        const user = await User.findById(id)
        if (!user) {
            return next(new HttpError('User not found',400))
        }
        if(user.accType === 'instructor'){
            const Exams = await Exam.find({creator: id}).sort({createdAt: -1})
            res.status(200).json(Exams)
        }
    } catch (error) {
        return next(new HttpError(error));
    }


}

// Get , api/exams/:id , unprotected  
const getExam = async (req,res,next) => {
    try {
        const examsId = req.params.id;
        const exam = await Exam.findById(examsId)
        if(!exam){
            return next(new HttpError('Exam not Found.',404));
        }
        res.status(200).json(exam)
    } catch (error) {
        return next(new HttpError(error));
    }
}

// DELETE , api/exams/:id , protected
const deleteExam = async (req,res,next) => {
    try {
        const examID = req.params.id;
        if(!examID){
            return next(new HttpError('Exam is unavailable.' , 400));
        }
        const exam = await Exam.findById(examID);
        const fileName =exam?.examPdfFile;
        if(req.user.id == exam.creator){
            fs.unlink(path.join(__dirname,'..','MyExams',fileName),async(err)=>{
                if(err){
                    return next(new HttpError(err))
                } else {
                    await Exam.findByIdAndDelete(examID);
                    const currentUser = await User.findById(req.user.id);
                    const userCourseCount = currentUser?.examsNo-1;
                    await User.findByIdAndUpdate(req.user.id , {examsNo: userCourseCount})
                    res.status(200).json(`Exam ${examID} deleted successfully.`)
                }
            })
        } else {
            return next(new HttpError('You can not delete that Exam' , 403));
        }
    } catch (error) {
        return next(new HttpError('Exam can not be deleted' , 403));
    }
}





module.exports = {
    createExam,
    getExam,
    getUserExams,
    deleteExam
  };
  