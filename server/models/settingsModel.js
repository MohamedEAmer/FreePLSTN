const {Schema , model} = require('mongoose')

const courseSchema = new Schema({
    //model setting information
    modelName: { type: Schema.Types.String,  ref:"Exam"},
    // description: { type: String , required: true},
    creator: { type: Schema.Types.ObjectId , ref: "User"},
    instructor:{type: Schema.Types.String,  ref:"User"},
    // reportIn: [{
    //     id: {
    //       type: Schema.Types.ObjectId,
    //       ref: 'Exam',
    //     }
    // }],
    // studentsIn: [{
    //     id: {
    //       type: Schema.Types.ObjectId,
    //       ref: 'User',
    //     }
    // }]
} , {timestamps: true})


module.exports = model("Settings" , courseSchema)