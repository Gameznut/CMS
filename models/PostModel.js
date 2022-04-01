const mongoose = require('mongoose');
const {
    MONGODBURI,
    PORT
} = require('../config/config')

const Schema = mongoose.Schema;
mongoose.connect(MONGODBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('connected to db');
    })
    .catch((error) => {
        console.log(error.message);
    })
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    
    status: {
        type: String,
        default: 'public'
    },
    
    description: {
        type: String,
        required: true
    },
    
    creationDate: {
        type: Date,
        default: Date.now()
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    
    allowComments: {
        type: Boolean,
        default: false
    },
    
    file: {
        type: String,
        default: ''
    }
    
})

module.exports = {
    Post: mongoose.model('post', PostSchema),
    PORT
}