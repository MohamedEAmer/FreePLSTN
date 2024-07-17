const express = require('express')
const cors = require('cors')
const {connect} = require('mongoose')
require('dotenv').config()
const upload = require('express-fileupload')
const userRoutes = require('./routes/userRoutes')
const examRoutes = require('./routes/examRoutes')
const maskRoutes = require('./routes/maskRoutes')
const settingRoutes = require('./routes/settingRoutes')


const {notFound, errorHandler} = require('./middleware/errorMiddleware')



const app = express();

app.use(express.json({extended: true}))// the shape of the data send in the api url 
app.use(express.urlencoded({extended: true}))// another shape of the data sent in the api url
app.use(cors({credentials: true , origin: 'http://localhost:3000'}))
app.use(upload())
app.use('/uploads', express.static(__dirname+'/uploads'))

app.use('/api/users' , userRoutes)
app.use('/api/exams', examRoutes)
app.use('/api/masks', maskRoutes)
app.use('/api/settings', settingRoutes)




app.use(notFound)
app.use(errorHandler)



connect(process.env.MONGO_URL).then(app.listen(5000, () => console.log(`Server running on port ${process.env.PORT}`))).catch(err=>{console.log})

