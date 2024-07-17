const { Router } = require('express');
const authMiddleware = require('../middleware/authMiddleware.js');
const { createExam, getExam, getUserExams, deleteExam } = require('../controllers/examController.js');


const router = Router()



router.post ('/',authMiddleware,createExam)// inside it the generatingMiddleware
router.get ('/:id',getExam)// for accessing the exam
router.get ('/users/:id',getUserExams)//for the dashboard
//router.patch ('/:id',authMiddleware,editExam)
router.delete ('/:id',authMiddleware,deleteExam)//to delete the model and its mask,setting...(all from the same button) from the DB


module.exports = router;
