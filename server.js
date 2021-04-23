require('./models/db')

const express = require('express')
const fs = require('fs')
const path = require('path')
require('dotenv/config');

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const hbs = require('express-handlebars')
const logger = require('morgan')
const port = process.env.PORT || 8080;
const bloggersController = require('./controller/getControllers')
const blogsController = require('./controller/getBlogController')
const multer = require('multer')

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// routing 
app.use('/', bloggersController)
app.use('/', blogsController)

// static folder
app.use(express.static('views'))
app.use(express.static("assets"))
app.use(express.static("uploads"))

// handlebars
app.engine('handlebars', hbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars');

// upload image
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
});

var upload = multer({ storage: storage });

var { Blog }  = require('./models/Blogs');

app.post('/publishBlog', upload.single('image'), (req, res, next) => {

    var newBlog = {
        'bloggerId': req.body.bloggerId,
        'title': req.body.title,
        'description': req.body.description,
        'content': req.body.content,
        'image': req.file.filename,
        'publishedOn': (new Date()).toISOString().split('T')[0]
    }

    var blog = new Blog(newBlog)

    try {
        
        blog.save((err, data) => {
            if (!err) {
        
                res.render('addBlog', {
                    message: "Blog is Published Successfully",
                    loginStatus: true,
                    username: "Ambarish"
                })
            }
            else { res.send(err) }
        })
    } catch (err) {
        
        res.status(400).json({message: "Cannot Publish Blog. Error:"+ err})
    }
    
})




app.get('/blogs', (req, res) => {
    Blog.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            var blogs = JSON.parse(JSON.stringify(items))
            console.log(blogs)
            res.render('blogs', { blog: blogs })
        }
    });
});





// listen to the port
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});





module.exports = app