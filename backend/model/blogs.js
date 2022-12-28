const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : String,
    description : String,
    user : {type : mongoose.Schema.Types.ObjectId,ref : "User"}
})
const Blogs = mongoose.model('blogs',blogSchema);
module.exports = Blogs;