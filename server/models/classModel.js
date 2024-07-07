// const {Schema , model} = require('mongoose')

// const courseSchema = new Schema({
//     name: { type: String , required: true},
//     category: { type: String , enum: ["Math","English","Science","History","Arabic","Geography","French","Arts"],
//         message: "VALUE is not supported"},
//     description: { type: String , required: true},
//     creator: { type: Schema.Types.ObjectId , ref: "User"},
//     instructor:{type: Schema.Types.String,  ref:"User"},
//     reportIn: [{
//         id: {
//           type: Schema.Types.ObjectId,
//           ref: 'Exam',
//         }
//     }],//for reports
//     studentsIn: [{
//         id: {
//           type: Schema.Types.ObjectId,
//           ref: 'User',
//         }
//     }]
// } , {timestamps: true})


// module.exports = model("Class" , courseSchema)