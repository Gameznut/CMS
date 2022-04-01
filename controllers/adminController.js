const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel')
const {isEmpty} = require('../config/customFuctions.js')
module.exports = {
    index: (req, res) => {
        // rendering from the admin folder
        res.render('admin/index')
    },
    allPosts: (req, res) => {
        // getting data from database
        Post.find().populate('category').then(posts => {
            // rendering from the admin folder
            res.render('admin/posts/index', {
                posts: posts
            })
        })
    },
    createPost: (req, res) => {
        // rendering from the admin folder
        Category.find().then(category => {
            res.render('admin/posts/create', {
                categories: category
            })
        })
    },
    submitPost: (req, res) => {
        // creating a new object in database        
        const commentsAllowed = req.body.allowComments ? true : false;
        // check for input file
        let filename = ''
        if(!isEmpty(req.files)) {
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/';
            
            file.mv(uploadDir+filename, (err) => {
                if (err)
                    throw err;
            });
        }

        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            allowcomments: commentsAllowed,
            category: req.body.category,
            file: `/uploads/${filename}`
        })
        newPost.save().then((post) => {
            req.flash('success-message', 'Post created successfully.');
            res.redirect('/admin/posts')
        }).catch((err) => {
            req.flash('error-message', 'Post failled')
            res.redirect('/admin/posts/create')
        });
    },
    editPost: (req, res) => {
        const id = req.params.id
        Post.findById(id).then(post => {
            Category.find().then(categories => {
                res.render(`admin/posts/edit`, {
                    post: post,
                    categories
                })
            })

        })
    },
    updatePost: (req, res) => {
        const commentsAllowed = req.body.allowComments ? true : false;


        const id = req.params.id;

        Post.findById(id)
            .then(post => {

                post.title = req.body.title;
                post.status = req.body.status;
                post.allowComments = req.body.allowComments;
                post.description = req.body.description;
                post.category = req.body.category;


                post.save().then(updatePost => {
                    req.flash('success-message', `The Post ${updatePost.title} has been updated.`);
                    res.redirect('/admin/posts');

                });
            });
    },
    deletePost: (req, res) => {
        Post.findByIdAndDelete(req.params.id).then(deletePost => {
            req.flash('success-message', `Post ${deletePost.title} has evaporated successfully.`);
            res.redirect('/admin/posts')
        })
    },

    // category
    getCategory: (req, res) => {
        Category.find().then((category) => {
            res.render('admin/category/index', {
                categories: category
            })
        })
    },
    submitCategory: (req, res) => {
        // console.log(req.body);
        const newCategory = new Category({
            title: req.body.name
        })
        newCategory.save().then((category) => {
            req.flash('success-message', 'category created successfully.');
            res.status(200).json(category)
        })
    },
    editCategory: async (req, res) => {
        const id = req.params.id
        const cats = await Category.find()
        await Category.findById(id).then(category => {
            res.render(`admin/category/edit`, {
                category: category,
                categories: cats
            })
        })
    },
    updateCategory: (req, res) => {     

        const id = req.params.id;
        const newTitle = req.body.name
        if (newTitle) {
            Category.findById(id)
                .then(category => {
                    category.title = newTitle
                    category.save().then(updated => {
                        res.status(200).json({
                            url: '/admin/category'
                        })
                    })
                })
        }


    }

}