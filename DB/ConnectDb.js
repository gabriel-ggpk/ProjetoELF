const uri = "mongodb+srv://gabrielHCS:BlackBerry10@cluster0.sqgb8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const connectDB = async () => {
  await mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};

module.exports = connectDB;

