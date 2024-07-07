// const {Schema , model} = require('mongoose')

// const courseSchema = new Schema({
//     name: { type: String , required: true},
//     category: { type: String , enum: ["Math","English","Science","History","Arabic","Geography","French","Arts"],
//         message: "VALUE is not supported"},
//     description: { type: String , required: true},
//     creator: { type: Schema.Types.ObjectId , ref: "User"},
//     instructor:{type: Schema.Types.String,  ref:"User"},
//     contentID:{type: Schema.Types.ObjectId,  ref:"Exam"},
//     content:{type: String},//for media (pdf) saving name
//     duration:{ type: Number, required: true},// days to solve the report
//     //هنا ممكن بعد ما يضغط رفع البلات فورم تصححلك الفايل بتاعك و تقطع و توريك الاوتبوت لو تمام كدا اضغط اوك و ابعته لو مش مظبوط تلغي و ترفعه تاني
//     classIn: [{
//         id: {
//           type: Schema.Types.ObjectId,
//           ref: 'Class',
//         }
//     }],
//     solved:{type: Boolean}
// } , {timestamps: true})


// module.exports = model("Report" , courseSchema)