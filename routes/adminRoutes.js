const express = require('express');
const router = express.Router()
const adminController = require('../controllers/adminController')

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin'

    next()
})

router.route('/')
    .get(adminController.index)

router.route('/posts')
    .get(adminController.allPosts)

router.route('/posts/create')
    .get(adminController.createPost)
    .post(adminController.submitPost)
    

router.route('/category')
    .get(adminController.category)
module.exports = router