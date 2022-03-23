const express = require('express');
const mongoose = require('mongoose');
const {MONGODBURI} = require('./config/config')
const PORT = process.env.PORT || 3000
const path = require('path');
const {create} = require('express-handlebars');
const app = express()

// conneting to mogodb
mongoose.connect(MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log('connected to db');
        })
        .catch((error)=>{
            console.log(error.message);
        })

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))

// set up views engine
app.set('view engine', 'handlebars')
app.engine('handlebars', create({defaultLayout: 'default'}).engine);


app.use('/', (req, res) => {
    // res.send('hello world')
    res.render('default/index')
})

app.listen(PORT, ()=>{
    console.log(`The ${PORT} is active`);
})
