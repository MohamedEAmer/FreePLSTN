const { Schema , model} = require('mongoose')

const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    examsNo: { type: Number, default:0},
    accType: { type: String , required: true},
    myExams: [{
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Exam',
        }
    }],//for created exams
    // myClasses: [{
    //     id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Class',
    //     }
    // }],//for created classes
    // classesIn: [{
    //     id: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Class',
    //     }
    // }]//for joined classes if student

})

module.exports = model('User',userSchema);