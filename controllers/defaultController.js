const Post = require('../models/PostModel').Post
const Category = require('../models/CategoryModel')

module.exports = {
    index:  (req, res) => {
        // const post = await Post.find()
        // const category = await Category.find()
        // rendering from the default folder

        res.render('default/index'/*, {posts: post, categories:category }*/)

    },
    loginGet: (req, res) => {
        // rendering from the default folder login file
        res.render('default/login')
    },
    loginPost: (req, res) => {
        // rendering from the default folder 
        res.send('submited a form')
    },
    registerGet: (req, res) => {
        // rendering from the default folder register file
        res.render('default/register')

    },
    registerPost: (req, res) => {
        res.send('submited a register form')
    }
}