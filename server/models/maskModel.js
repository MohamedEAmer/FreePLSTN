const {Schema , model} = require('mongoose')

const courseSchema = new Schema({
    title: { type: String , required: true},
    category: { type: String , enum: ["Math","English","Science","History","Arabic","Geography","French","Arts"],
        message: "VALUE is not supported"},
    creator: { type: Schema.Types.ObjectId , ref: "User"},
    instructor:{type: Schema.Types.String,  ref:"User"},
    maskType: { type: String , required: true},//exam or report
    content: { type: String , required: true},//mask data / media (pdf)
    contentID:{type: Schema.Types.String,  ref:"Exam"},//my without color exam or report
    // contentID2:{type: Schema.Types.String,  ref:"Report"},//my without color exam or report
} , {timestamps: true})


module.exports = model("Mask" , courseSchema)