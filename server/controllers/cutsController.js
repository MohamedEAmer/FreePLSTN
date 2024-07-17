// the pics that cut by the AI model
const Exam = require('../models/examModel.js');
const Cuts = require('../models/cutsModel.js');
const Assistant = require('../models/assistantModel.js');
const fs = require('fs');
const path = require('path');
const axios = require ('axios')
const HttpError = require('../models/errorModel.js');



// POST , api/exams , protected
const examCutting = async (req,res,next) => {
    try {
        const examID = req.params.id;
        const currentExam = await Exam.findById(examID);
        if(!currentExam){
            return next(new HttpError('Exam not Found.',404));
        }   
        const data ={
            name:currentExam.name,
            MCQs:currentExam.MCQs,
            TFs:currentExam.TFs,
            Text:currentExam.Text,
            examID:examID,
            maskID: currentExam.myMask
        }
        try{
            const response = await axios.post('http://localhost:5000/correct-exam', data)
            const res = response.data;
            res.status(200).json('Exam Corrected Successfully' , res)
        } catch (error) {
            return next(new HttpError(error));
        }


        res.status(200).json(newExam)
        
    } catch (error) {
        return next(new HttpError(error));
    }
}