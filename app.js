const express = require ("express");
const fs =  require("fs");
const path =  require("path");
const app =  express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/DanceContact');
}
const port =  5000;

// MONGOOSE - SCHEMA

const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
  });

const Contact = mongoose.model('Contact', ContactSchema);


// EXPRESS 
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// PUG 
app.set('view engine', 'pug') 
app.set('views', path.join(__dirname, 'views')) 

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {  }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {  }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Saved in Database.!")
        res.status(200).render('contact.pug');
    }).catch(()=> {
        res.status(600).send("Nhi hua save")
    })
    
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`sahi chal rha hai ${port} port per`);
});