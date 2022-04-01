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

router.route('/posts/edit/:id')
    .get(adminController.editPost)
    .put(adminController.updatePost)
    
router.route('/posts/delete/:id')
    .delete(adminController.deletePost)

router.route('/category')
    .get(adminController.getCategory)

router.route('/category/create')
    .post(adminController.submitCategory)

router.route('/category/edit/:id')
    .get(adminController.editCategory)
    .post(adminController.updateCategory)
module.exports = router
