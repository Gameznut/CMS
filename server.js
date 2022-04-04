const express = require('express');
const {PORT} = require('./models/PostModel')
const path = require('path');
const {create} = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const app = express()
const {globalVariable} = require('./config/config')
const methodOverride = require('method-override');
const {selectOption} = require('./config/customFuctions')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const passport = require('passport');

/* fixing Handlebars: Access has been denied to resolve the property
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access') */


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))

/*  Flash and Session*/
app.use(cookieParser())
app.use(session({ secret: 'keyboard', resave: true, saveUninitialized: true }));
app.use(flash())

// Passport Initializes
app.use(passport.initialize())
app.use(passport.session())

// use global variable
app.use(globalVariable)

// file Upload middleware
app.use(fileUpload())

// set up views engine
// folder must be called views
app.set('view engine', 'handlebars')

// rendering from the layouts folder
/* To solve Handlebars: Access has been denied to resolve the property
 app.engine('handlebars', create({
     defaultLayout: 'default',
     handlebars: allowInsecurePrototypeAccess(Handlebars)
 }).engine);
  or this */
app.engine('handlebars', create({
    defaultLayout: 'default',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
    helpers: {
        select: selectOption
    }
}).engine);

// method override
app.use(methodOverride('newMethod'))
// custom routes
const defaultRoutes = require('./routes/defaultRoutes')
const adminRoutes = require('./routes/adminRoutes')

app.use('/', defaultRoutes)
app.use('/admin', adminRoutes)


app.listen(PORT, () => {
    console.log(`The ${PORT} is active`);
})