const {Router} = require('express')

const authMiddleware = require('../middleware/authMiddleware')

const  {createSetting,getSetting,editSetting,deleteSetting} = require('../controllers/settingController')
const router = Router()


router.post ('/',authMiddleware,createSetting)//for exam questions settings (must be saved in the DB)
router.get ('/:id',getSetting)// to get it for the assistant model and instructor actions
router.patch ('/:id',authMiddleware,editSetting)// to modify it before correcting
router.delete ('/:id',authMiddleware,deleteSetting)//to delete it from the DB 


module.exports = router