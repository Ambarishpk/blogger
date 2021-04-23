const mongoose = require('mongoose')

var Blog = mongoose.model('Blog',
    {
        bloggerId: { type: String },
        title: { type: String },
        description: {type: String},
        content: {type: String},
        image: {type:String},
        publishedOn: {type: String},
})

module.exports = { Blog }