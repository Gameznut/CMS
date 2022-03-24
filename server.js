const express = require('express');
const {PORT} = require('./models/PostModel')
const path = require('path');
const {create} = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const app = express()
const {globalVariable} = require('./config/config')


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))

/*  Flash and Session*/
app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}));
// app.use(express.cookieParser('keyboard cat'))
app.use(flash())

// use global variable
app.use(globalVariable)

// set up views engine
// folder must be called views
app.set('view engine', 'handlebars')

// rendering from the layouts folder
app.engine('handlebars', create({defaultLayout: 'default'}).engine);

// custom routes
const defaultRoutes = require('./routes/defaultRoutes')
const adminRoutes = require('./routes/adminRoutes')

app.use('/', defaultRoutes)
app.use('/admin', adminRoutes)


app.listen(PORT, ()=>{
    console.log(`The ${PORT} is active`);
})
