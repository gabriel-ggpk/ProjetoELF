require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = async () => {
  await mongoose.connect(process.env.mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};

module.exports = connectDB;

