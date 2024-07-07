const {Schema , model} = require('mongoose')

const courseSchema = new Schema({
    title: { type: String , required: true},
    //type: { type: String , required: true},// to know if it is for class or printing(report or exam)
    category: { type: String , enum: ["Math","English","Science","History","Arabic","Geography","French","Arts"],
        message: "VALUE is not supported"},
    description: { type: String , required: true},
    creator: { type: Schema.Types.ObjectId , ref: "User"},
    instructor:{type: Schema.Types.String,  ref:"User"},
    content:{type: Schema.Types.String, required: true},//for storing the exam model data
    classesIn: [{
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Class',
        }
      }]//if it is a report
} , {timestamps: true})


module.exports = model("Exam" , courseSchema)