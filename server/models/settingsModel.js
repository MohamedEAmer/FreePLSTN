const { Schema, model } = require('mongoose');

const settingsSchema = new Schema({
    examName: { type: Schema.Types.String,  ref:"Exam"},
    examCode: { type: Schema.Types.String,  ref:"Exam"},
    creator: { type: Schema.Types.ObjectId , ref: "User"},
    instructor:{type: Schema.Types.String,  ref:"User"},
    totalMarks:{type: Schema.Types.Number , ref:'Exam'},
    questions: [{
        number: {
          type: Schema.Types.String,
        },
        type: {
          type: Schema.Types.String,
        },
        weight: {
          type: Schema.Types.Number,
        },
        correctAnswer: {
          type: Schema.Types.String,
        },

    }],
} , {timestamps: true})

module.exports = model("Settings", settingsSchema);