const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes') 
const adminRoutes = require('./routes/adminRoutes')
const shopRoutes = require('./routes/shopRoutes')
const recentRoutes = require('./routes/recentRoutes')


//connection string
const dbURI = "mongodb+srv://root:9N3Ot1CdVNXIsl25@cluster0.mefxoff.mongodb.net/hirayadb?retryWrites=true&w=majority"
// const url = "mongodb://localhost:27017/hirayadb"

mongoose.connect(
    dbURI,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }
).then(result => app.listen(5000, err => console.log("listening at port 5000...")))
.catch(err => console.log(err))

/////////////////////////////////////////////////////////

app.use(bodyParser());

app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(recentRoutes)

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

app.get("/", (req,res) => {
    res.render('home')
})

app.get("/shop-now", (req,res) => {
    res.render('shop-now')
})

app.get("/user/login", (req,res) => {
    res.render('login')
})

app.get("/user/signup", (req,res) => {
    res.render('sign-up')
})

app.get("/user/my-account", (req, res) => {
    res.render('my-account')
})

app.get("/user/security/:userid", (req, res) => {
    res.render('security')
})

app.get("/about", (req,res) => {
    res.render('about')
})

app.get("/faqs", (req,res) => {
    res.render('faqs')
})

app.get("/checkout", (req,res) => {
    res.render('checkout')
})

app.use((req,res) => {
    res.status(404).render('error404')
})
