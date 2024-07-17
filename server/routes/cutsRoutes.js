const { Router } = require('express');
const authMiddleware = require('../middleware/authMiddleware.js');
const { examCutting, getExamCuts, deleteExamCuts } = require('../controllers/cutsController.js');


const router = Router()


router.post ('exam/:id',authMiddleware,examCutting)//for correcting the exam and cut the pics (correcting middleware here) and saving it in a folder , and the DB
//call get mask with it
router.get ('/:id',authMiddleware,getExamCuts)// to get the exam pics , in some order , accessing that folder
router.delete ('/:id',authMiddleware,deleteExamCuts)//to delete it from the DB , and the folder


export default router;