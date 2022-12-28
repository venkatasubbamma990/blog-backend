let mongoose = require('mongoose')
let app = require('./app')
let port = 3000
mongoose.connect("mongodb+srv://venkatasubbamma:sudha1454@cluster0.xyzlhys.mongodb.net/?retryWrites=true&w=majority",()=>{
    console.log('connected to db')
})
app.listen(port,()=>{
    console.log(`express server running at http://localhost:${port}`)
})
