const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    examsNo: { type: Number, default:0},
    accType: { type: String , default:'instructor'},
    myExams: [{
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Exam',
        }
    }],
    myMasks: [{
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Mask',
      }
  }],


})
module.exports = model("User", userSchema);