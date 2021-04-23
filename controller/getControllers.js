const express = require('express')
const router = express.Router()
var { Blogger } = require('../models/Bloggers');

// BLOGGER SIGNUP
router.get('/signup', async (req, res) => {
    res.render('bloggerRegistration', {
        message: "message from backend"
    })
})

// BLOGGER SIGNIN
router.get('/login', async (req, res) => {
    res.render('bloggerLogin', {
        loginStatus: false,
    })
})

// SUCCESSFUl LOGIN
router.get('/authenticate', async (req, res) => {
    res.render('home', {
        message: "Logged in successfully",
        loginStatus: true,
        username: "Ambarish"
    })
})

// HOME
router.get('/home', async (req, res) => {
    res.render('home', {
        message: "Home Page",
        loginStatus: false,
    })
})


// ADD BLOG FORM
router.post('/addBlog', async (req, res) => {
        res.render('addBlog', {
            message: "Add Blog Form",
            loginStatus: true,
            username: "Ambarish"
        })
})




router.get("/getUsers", async (req, res) => {
    try {
        Blogger.find((err, data) => {
            if (!err) {
                res.status(200).json({
                    data: data
                });
            }
            else {
                res.send(err)
            }
        })
    }
    catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
    
})

router.post("/addUser", (req, res) => {
    var newUser = {
        'name': req.body.name,
        'age': req.body.age,
        'mobile': req.body.mobile,
    }

    var user = new Blogger(newUser)

    try {
        
        user.save((err, data) => {
            if (!err) {
                res.render('bloggerRegistration', {
                    addStatus: true,
                    addStatusMessage: "data is stored successfully"
                })
            }
            else { res.send(err) }
        })
    } catch (err) {
        res.status(400).json({message: "Cannot add user. Error:"+ err})
    }
})


router.get("/find/:id", (req,res) => {
    try {
        Blogger.findById(req.params.id, (err, data) => {
            if (!err) {
                res.status(200).json({
                    data: data
                });
            }
            else { res.send(err) }
        })
    } catch (err) {
        res.status(400).json({message: "Some error occured",err });
    }
})


router.put("/update/:id", (req,res) => {
    
    var updateUser = {
        'name': req.body.name,
        'age': req.body.age,
        'mobile': req.body.mobile,
    }

    try {
        Blogger.findByIdAndUpdate(req.params.id, { $set: updateUser }, { new: true }, (err, data) => {
            if (!err) {
                res.status(200).json({
                    data: data
                });
            }
            else { res.send(err) }
        })
    } catch (err) {
        res.status(400).json({message: "Failed to find the user with id :"+ req.params.id})
    }
})


router.delete("/remove/:id", (req,res) => {
    try {
        Blogger.findByIdAndRemove(req.params.id, (err, data) => {
            if (!err) {
                res.status(200).json({
                    data: data
                });
             }
            else { res.send(err) }
        })
    } catch (err) {
        res.status(400).json({message: "Failed to delete the user with id :"+ req.params.id})
    }
})


module.exports = router