const { Router } = require('express');
const { registerUser, loginUser, getUser, editUser } = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = Router()


router.post ('/register',registerUser)
router.post ('/login',loginUser)
router.get ('/:id',getUser)
router.patch ('/profile',authMiddleware,editUser)


module.exports = router;