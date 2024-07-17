const { Schema, model } = require('mongoose');

const cutsSchema = new Schema({
    order:{type: String },//which Q
    exam:{type: Schema.Types.String,  ref:"Exam"},
    mask:{type: Schema.Types.String,  ref:"Mask"},
    examID:{type: Schema.Types.ObjectId,  ref:"Exam"},
    maskID:{type: Schema.Types.ObjectId,  ref:"Mask"},
    cutData: { type: String , required: true},//the photo (single or multi)
} , {timestamps: true})


module.exports = model("Cuts", cutsSchema);