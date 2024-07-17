const { Router } = require('express');
const authMiddleware = require('../middleware/authMiddleware.js');
const { createSetting, getSetting, editSetting, deleteSetting } = require('../controllers/settingController.js');


const router = Router()


router.post ('/exam/:id',authMiddleware,createSetting)
router.get ('/:id',getSetting)
router.patch ('/:id',authMiddleware,editSetting)
router.delete ('/:id',authMiddleware,deleteSetting)


module.exports = router;
