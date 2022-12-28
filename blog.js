let  mongoose = require('mongoose');
let blogSchema = new mongoose.Schema({
    file:{type:String},
    Author:{type:String,required:true},
    Title:{type:String,required:true},
    Description:{type:String,required:true},
    Date:{type:Date}
})
let Blog = mongoose.model('blog',blogSchema);
module.exports = Blog