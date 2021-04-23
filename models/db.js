var mongoose = require('mongoose')

mongoose.set('useFindAndModify', false);


mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log("Database connected successfully...") }
    else { console.log("Error : "+err) }
})

require('./Bloggers')