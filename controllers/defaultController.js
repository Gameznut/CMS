const Post = require('../models/PostModel').Post
const Category = require('../models/CategoryModel')
const Comment = require('../models/CommentModel')
const User = require('../models/UserModel')
const bycrpt = require('bcrypt');
const {
    isBuffer
} = require('util');
const { error, log } = require('console');

module.exports = {
    index: async (req, res) => {
        const post = await Post.find()
        const category = await Category.find()
        // rendering from the default folder

        res.render('default/index', {
            posts: post,
            categories: category
        })

    },
    loginGet: (req, res) => {
        // rendering from the default folder login file
        res.render('default/login')
    },
    loginPost: (req, res) => {

    },
    registerGet: (req, res) => {
        // rendering from the default folder register file
        res.render('default/register')

    },
    registerPost: (req, res) => {
        let errors = []

        if (!req.body.firstName) {
            errors.push({
                message: "Firstname is mandatory"
            })
        }
        if (!req.body.lastName) {
            errors.push({
                message: "Lastname is mandatory"
            })
        }
        if (!req.body.email) {
            errors.push({
                message: "Email is mandatory"
            })
        }
        if (req.body.password !== req.body.passwordConfirm) {
            errors.push({
                message: "Password doesn't match"
            })
        }

        if (errors.length > 0) {
            res.render('default/register', {
                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            })
        } else {
            User.findOne({
                email: req.body.email
            }).then(user => {
                if (user) {
                    errors.push({
                        message: "Email already exist"
                    })
                    res.render('default/register', {
                        errors: errors,
                        email: req.body.email
                    })
                } else {
                    const newUser = new User(req.body)
                    bycrpt.genSalt(10, (err, salt) => {
                        bycrpt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash
                            newUser.save().then(user => {
                                // req.flash('success-message', "You are now registered check your mail to confirm your email address")
                                setTimeout(() => {
                                    res.render('default/register', {
                                        success: "You are now registered check your mail to confirm your email address",
                                    })
                                    // res.redirect('/login')
                                }, 3000)

                            }).catch((error) => {
                                console.log(error.message);
                            })
                        })
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }

    },

    singlePost: async (req, res) => {
        const category = await Category.find()
        const id = req.params.id

        Post.findById(id).populate({
            path: 'comments',
            populate: {
                path: 'user',
                model: 'user'
            }
        }).then(post => {
            if (!post) {
                res.status(404).json({
                    message: 'No Post Found'
                })
            } else {
                res.render('default/singlePost', {
                    post: post,
                    categories: category,
                    comments: post.comments
                })
            }
        })
    },

    submitComment: (req, res) => {
        if (req.user) {
            Post.findById(req.body.id).then(post => {
                const newComment = new Comment({
                    user: req.user.id,
                    body: req.body.comment_body
                })
                log(newComment)
                post.comments.push(newComment)
                post.save().then(savedPost => {
                    newComment.save().then( savedComment =>{
                        req.flash('success-message', "Your Comment was Submited")
                        res.redirect(`/post/${post._id}`)
                    })
                })
            }).catch(error=>{
                log(error);
            })
        }
        else{
            res.redirect('/login')
        }
    }
}