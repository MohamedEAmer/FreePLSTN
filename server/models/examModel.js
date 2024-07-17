const { Schema, model } = require('mongoose');


const examSchema = new Schema({
    name: { type: String , required: true},
    MCQs: { type: Number , required: true},
    TFs: { type: Number , required: true},
    Text: { type: Number , required: true},
    textLines: [{ type: Number, required: true }],
    examCode:{ type: String , required: true},
    totalMarks:{ type: Number , required: true},
    creator: { type: Schema.Types.ObjectId , ref: "User"},
    instructor:{type: Schema.Types.String,  ref:"User"},
    examPdfFile: { type: String,},
    myMask: {type: Schema.Types.ObjectId,ref: 'Mask',},
    mySettings: {type: Schema.Types.ObjectId,ref: 'Settings',},

} , {timestamps: true})
module.exports = model("Exam", examSchema);