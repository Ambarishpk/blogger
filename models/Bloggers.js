const mongoose = require('mongoose')

var User = mongoose.model('User',
{
    name: {type: String},
    age: {type: String},
    mobile: {type: String}
})

module.exports = { User }