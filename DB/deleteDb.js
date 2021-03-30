const connectDB = require('./ConnectDb');
const mongoose = require('mongoose');
const Post = require('./Models/Post');



const deletePost = async(id)=>{
    await Post.findByIdAndDelete(id);
    console.log("naice")
}
    


module.exports = deletePost;