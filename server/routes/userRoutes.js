const {Router} = require('express')

const { registerUser ,loginUser ,getUser, editUser } = require('../controllers/userController')

const authMiddleware = require('../middleware/authMiddleware')

const router = Router()


router.post ('/register',registerUser)//register page
//router.post ('/invite',authMiddleware,createUser)//invite page,sendEmail
router.post ('/login',loginUser)//login page
router.get ('/:id',getUser)//profile page
router.patch ('/edit-user',authMiddleware,editUser)// update user info


module.exports = router