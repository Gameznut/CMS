const express = require('express');
const router = express.Router()
const defaultController = require('../controllers/defaultController')
const User = require('../models/UserModel')
const bycrpt = require('bcrypt');
const passport = require('passport');
const localStategy = require('passport-local').Strategy;

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'default'

    next()
})
router.route('/')
    .get(defaultController.index)


passport.use(new localStategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({
        email: email
    }).then(user => {
        if (!user) {
            return done(null, false, req.flash('error-message', "User not found"))
        }
        bycrpt.compare(password, user.password, (err, passwordMatched) => {
            if (err) {
                return err.message
            }
            if (!passwordMatched) {
                return done(null, false, req.flash('error-message', 'Invalid Username or Password'))
            }
            return done(null, user, req.flash('success-message', "Login Successful"))
        })
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id,(err, user) => {
        done(err, user)
    })
})

router.route('/login')
    .get(defaultController.loginGet)
    .post(passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: true,
        session: true
    }), defaultController.loginPost)

router.route('/register')
    .get(defaultController.registerGet)
    .post(defaultController.registerPost)


router.route('/post/:id')
    .get(defaultController.singlePost)
    .post(defaultController.submitComment)


router.get('/logout', (req, res)=>{
    req.logOut();
    req.flash('success-message', 'logout was successful')
    res.redirect('/')
})
module.exports = router