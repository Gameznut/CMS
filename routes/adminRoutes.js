const express = require('express');
const router = express.Router()
const adminController = require('../controllers/adminController')
router.route('/')
    .get(adminController.index)
    

// router.route('/login')
//     .get(adminController.loginGet)
//     .post(adminController.loginPost)

// router.route('/register')
//     .get(adminController.registerGet)
//     .post(adminController.registerPost)

module.exports = router