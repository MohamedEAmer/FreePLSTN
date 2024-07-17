const { Schema, model } = require('mongoose');

const maskSchema = new Schema({
    name: { type: String , required: true},
    MCQs: { type: Number , required: true},
    TFs: { type: Number , required: true},
    Text: { type: Number , required: true},
    creator: { type: Schema.Types.ObjectId , ref: "User"},
    instructor:{type: Schema.Types.String,  ref:"User"},
    maskPdfFile: { type: String , required: true},//mask data / media (pdf)
    exam:{type: Schema.Types.ObjectId,  ref:"Exam"},//my without color exam or report
} , {timestamps: true})
module.exports = model("Mask", maskSchema);