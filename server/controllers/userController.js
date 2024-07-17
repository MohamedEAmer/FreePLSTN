const HttpError = require('../models/errorModel.js');
const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// POST , api/users/register , unprotected
const registerUser = async (req, res ,next)=>{
    try {
        const{name , email, password ,password2} = req.body;
        if(!name ||!email ||!password){
            return next(new HttpError('Fill in All fields. ',400))
        }

        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({email: newEmail});

        if(emailExists) {
            return next(new HttpError('Email Already Exists. ',400))
        }

        if((password.trim().length < 6)){
            return next(new HttpError('Password should be at least 6 characters. ',400))
        }

        if(password != password2) {
            return next(new HttpError('Passwords do not match. ',400))
        } 

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password , salt);
        const newUser = await User.create({name , email: newEmail , password: hashedPass })
        res.status(200).json(newUser)

    } catch (error) {
        return next(new HttpError('User Registration Failed',400))
        
    }
}


// POST , api/users/login , unprotected
const loginUser = async (req, res ,next)=>{
    try {
        const{email, password } = req.body;
        if(!email ||!password){
            return next(new HttpError('Fill in All fields. ',400));
        }

        const newEmail = email.toLowerCase();

        const user = await User.findOne({email:newEmail});
        if(!user){
            return next(new HttpError('Invalid Inputs.',400));
        }
        const comparePass = await bcrypt.compare(password , user.password);
        if(!comparePass){
            return next(new HttpError('Wrong password.',400));
        }

        const {_id: id, name }= user;

        const token = jwt.sign({id,name}, process.env.JWT_SECRET,{expiresIn:"1d"});

        res.status(200).json({token, id , name});
        //res.status(200).json({token,user}) 
    } catch (error) {
        return next(new HttpError('Login failed . Please Enter the Email and Password. ',400));
    }
}


// GET , api/users/:id , protected
const getUser = async (req, res ,next)=>{
    try {
        const {id} =  req.params;
        const user = await User.findById(id).select('-password');

        if(!user){
            return next(new HttpError('User not found.',400))
        }
    
        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError(error));
    }
}


// POST , api/users/profile , protected
const editUser= async (req, res ,next)=>{
    try {
        const{name , email, currentPassword ,newPassword,confirmNewPassword} = req.body;
        if(!name ||!email ||!currentPassword||!newPassword){
            return next(new HttpError('Fill in All fields. ',400))
        }
        const user = await User.findById(req.user.id);

        if(!user){
            return next(new HttpError('User not found.',403))
        }

        const emailExist = await User.findOne({email});

        if(emailExist && emailExist._id != req.user.id){
            return next(new HttpError('Email already exist.',400))
        }

        const validateUserPassword = await bcrypt.compare(currentPassword , user.password);
        if(!validateUserPassword){
            return next(new HttpError('Invalid current password',400))
        }

        if(newPassword !== confirmNewPassword){
            return next(new HttpError('New password Do not match.',400))
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword , salt);

        const newInfo = await User.findByIdAndUpdate(req.user.id ,{name , email , password: hash},{new: true})

        res.status(200).json(newInfo)
    } catch (error) {
        return next(new HttpError(error)) 
    }

}







module.exports = {
    registerUser,
    loginUser,
    getUser,
    editUser
  };