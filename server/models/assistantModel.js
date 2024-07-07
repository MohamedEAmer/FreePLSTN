const {Schema , model} = require('mongoose')

const courseSchema = new Schema({
    name: { type: String , required: true},
    category: { type: String , enum: ["Math","English","Science","History","Arabic","Geography","French","Arts"],
        message: "VALUE is not supported"},
    creator: { type: Schema.Types.ObjectId , ref: "User"},
    instructor:{type: Schema.Types.String,  ref:"User"},
    data: [{
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Cuts',
      }
    }],
    exam:{type: Schema.Types.String,  ref:"Exam"},
    mask:{type: Schema.Types.String,  ref:"Mask"},
} , {timestamps: true})


module.exports = model("Assistant" , courseSchema)