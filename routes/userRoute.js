const express = require('express')
const User = require('../models/user.js')
const router = express.Router()

router.post('/login', async function (req, res) {
    try{
        const result = await User.findOne({email: req.body.email, password: req.body.password})

        if(result)
        {
            res.send(result)
        }else{
            res.status(500).json('Error has occured!');
        }
    } catch (error){
        res.status(500).json(error);
    }
})

router.post('/register', async function (req, res) {
    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.send('User Registered Succesfully!')
    } catch (error){
        res.status(500).json(error);
    }
})

module.exports = router;
