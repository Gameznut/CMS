const mongoose = require('mongoose');
const {MONGODBURI, PORT} = require('../config/config')

const Schema = mongoose.Schema;
mongoose.connect(MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log('connected to db');
        })
        .catch((error)=>{
            console.log(error.message);
        })
const PostSchema = new Schema({
    title:{
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "public"
    },

    description:{
        type: String,
        required: true
    },

    creationDate:{
        type: Date,
        default: Date.now()
    }
})

module.exports = {
    Post : mongoose.model('post', PostSchema),
    PORT
}