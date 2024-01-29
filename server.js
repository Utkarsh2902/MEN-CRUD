const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/productModel')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get('/', function (req, res) {
    res.send('Hello Node api hey g')
})

//save /create products
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})
//get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

//get single product by id

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})
//update edit product
app.put('/products/:id',async(req,res)=>{
    try{
     const {id}=req.params
     const product=await Product.findByIdAndUpdate(id,req.body)
     if(!product)
     {
        return res.status(404).json({message:`cannot find product ${id}`})
     }
     const updatedProduct = await Product.findById(id)
     res.status(200).json(updatedProduct)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

//delete a product

app.delete('/products/:id',async(req,res)=>{
    try{
     const {id}=req.params;
     const product=await Product.findByIdAndDelete(id)
     if(!product)
     {
        return res.status(404).json({message:`cannot find product ${id}`})
     }
     res.status(200).json(product)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})


mongoose.connect('mongodb+srv://utkarsh:Utkarsh123@utkarshapi.06cyvww.mongodb.net/Node-API')
    .then(() => {
        console.log("hello Mongo")
        app.listen(3000)
    }).catch((error) => {
        console.log(error)
    })