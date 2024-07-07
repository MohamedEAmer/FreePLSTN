const {Router} = require('express')

const authMiddleware = require('../middleware/authMiddleware')

const  {createMask,getMask,deleteMask} = require('../controllers/maskController')
const router = Router()



router.post ('/',authMiddleware,createMask)// if with download button or submit // or running a different code
router.get ('/:id',getMask)//for the assistant model to correct
router.delete ('/:id',authMiddleware,deleteMask)// to delete it and its info from the DB


module.exports = router