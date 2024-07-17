const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Abdo:freePLSTN@cluster0.c5nck5p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // Remove deprecated options
      }
    )
    console.log('MongoDB connected')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
