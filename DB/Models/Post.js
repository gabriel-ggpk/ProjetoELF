
const mongoose = require('mongoose');

const post = new mongoose.Schema({
  imgUrl: {
    type: String
  },
  title: {
    type: String
  },
  description:{
      type: String
  },
  theme:{
      type: String
  },
  link: {
      type: String
  }
});

module.exports = Post = mongoose.model('post',post);