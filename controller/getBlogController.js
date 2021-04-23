const express = require('express')
const router = express.Router()
var { Blog } = require('../models/Blogs');


router.get('/blog/:id', (req, res) => {
    Blog.findById(req.params.id, (err, item) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            var blog = JSON.parse(JSON.stringify(item))
            console.log(blog)
            res.render('postpage', { blog: blog })
        }
    });
});









module.exports = router