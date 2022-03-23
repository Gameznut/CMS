const express = require('express');
// const mongoose = require('mongoose');
// const {PORT} = require('./config/config')
const {PORT} = require('./models/PostModel')
const path = require('path');
const {create} = require('express-handlebars');
const app = express()

// conneting to mogodb


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))

// set up views engine
// folder must be called views
app.set('view engine', 'handlebars')

// rendering from the layouts folder
app.engine('handlebars', create({defaultLayout: 'default'}).engine);

// custom routes
const defaultRoutes = require('./routes/defaultRoutes')
app.use('/', defaultRoutes)

app.listen(PORT, ()=>{
    console.log(`The ${PORT} is active`);
})
