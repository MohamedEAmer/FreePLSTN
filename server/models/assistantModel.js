const { Schema, model } = require('mongoose');


const assistantSchema = new Schema({
    enteredData:{ type: String , required: true},
    examName: { type: String , required: true},
    creator: { type: Schema.Types.ObjectId , ref: "User"},
    instructor:{type: Schema.Types.String,  ref:"User"},
    data: [{
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Cuts',
      }
    }],
    exam:{type: Schema.Types.ObjectId,  ref:"Exam"},
    mask:{type: Schema.Types.ObjectId,  ref:"Mask"},
} , {timestamps: true})

module.exports = model("Assistant", assistantSchema);