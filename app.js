let express = require('express');
let Blog = require('./blog')
let cloudinary = require('./cloudinary');
let uploader = require('./multer')
let app = express();
app.get('/',(req,res)=>{
    res.send('hello its express')

})
app.get('/data', async (req,res)=>{
    try{
        let blog = await Blog.find();
    res.status(200).json({
        status:"success",
        blog:blog
    })
    }
    catch(e){
        res.status(400).json({
            status:'failure',
            message:e.message
        })
    }
})
app.post("/createpost", uploader.single('file'), async (req, res) => {

    console.log(req.body)
   
    try {
        const upload = await cloudinary.v2.uploader.upload(req.file.path);
        // console.log(upload)
        const blog =await Blog.insertMany({
            file: upload.secure_url,
            Author:req.body.Author,
            Title:req.body.Title,
            Description:req.body.Description,
            Date:Date.now()
        });

        // console.log(data)

        return res.status(200).json({
            success:"success",
            blog:blog,
        });
    }
    catch (e) {
        res.status(400).json({
            status:"failure",
            message: e.message
        });
    }
});
module.exports = app