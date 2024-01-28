const express=require('express')
const mongoose = require('mongoose')
const app=express()

app.get('/',function(req,res){
    res.send('Hello Node api hey g')
})

mongoose.connect('mongodb+srv://utkarsh:Utkarsh123@utkarshapi.06cyvww.mongodb.net/Node-API')
.then(()=>{
    console.log("hello Mongo")
    app.listen(3000)
}).catch((error)=>{
    console.log(error)
})