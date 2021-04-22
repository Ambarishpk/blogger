const express = require('express')
const router = express.Router()
//const ObjectID = require('mongoose').Types.ObjectId

var { User } = require('../models/Users');
const { path, response } = require('../server');



router.get('/signup', async (req, res) => {
    res.render('bloggerRegistration', {
        message: "message from backend"
    })
})
router.get('/home', async (req, res) => {
    res.render('home', {
        message: "Home Page - this message is coming from backend"
    })
})

router.get('/link', async (req, res) => {
    res.render('link', {
        message: "Link Page - message from backend",
        myName:"Ambarish"
    })
})

router.get("/getUsers", async (req, res) => {
    try {
        User.find((err, data) => {
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

    var user = new User(newUser)

    try {
        
        user.save((err, data) => {
            if (!err) {
                res.render('bloggerRegistration', {
                    status: "data is stored successfully"
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
        User.findById(req.params.id, (err, data) => {
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
        User.findByIdAndUpdate(req.params.id, { $set: updateUser }, { new: true }, (err, data) => {
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
        User.findByIdAndRemove(req.params.id, (err, data) => {
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