const Post = require('../models/PostModel').Post;

module.exports = {
    index: (req, res) => {
        // rendering from the admin folder
        res.render('admin/index')
    },
    allPosts: (req, res) => {
        // rendering from the admin folder
        res.render('admin/posts/index')
    },
    createPost: (req, res) => {
        // rendering from the admin folder
        res.render('admin/posts/create')
    },    
    submitPost: (req, res) => {
        // rendering from the admin folder
        const newPost = new Post ({
            title : req.body.title,
            description: req.body.description,
            status:req.body.status
        })
        newPost.save().then((post) => {
            req.flash('success-message', 'Post created successfully.');
            res.redirect('/admin/posts')
        }).catch((err) => {
            console.log(err.message);
            req.flash('error-message', 'Post failled successfull')

        });
    },
    category: (req, res) => {
        res.render('admin/category/index')
    }

}