const express = require('express');
const router = express.Router();
const User = require('../models/user_model')


//To get all users
router.get('/', async function (req, res) {

    try {
        const arr = (await User.find({}));
        res.json(arr);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//To get one user
router.get('/:id', async function (req, res) {
    let User_x
    User_x = await User.findById(req.params.id);
    if (User_x != null)
        res.json(User_x);
    else
        res.status(404).json({ message: 'No User with this id exists' });
});

//to add user
router.post('/', async function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        lastActive: Date.now()

    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.json({ message: err.message });
    }
});

//To delete user by id
router.delete('/:id', async function (req, res) {
    let User_x;
    try {
        User_x = await User.findByIdAndDelete(req.params.id);
        if (User_x != null)
            res.json({ message: 'Deleted Subscriber' });
        else
            res.status(404).json({ message: 'No User with this id exists' });


    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//to change password 
router.patch('/:id', async function (req, res) {
    let User_x;

    User_x = await User.findById(req.params.id);
    if (User_x == null) {
        return res.status(404).json({ message: 'No User with this id exists' });
    }
    if (req.body.password.length < 8) {
        return res.status(404).json({ message: 'Weak Password' });
    }

    User_x.password = req.body.password;

    try {
        const NewPassword = await User_x.save()
        res.json(NewPassword)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

module.exports = router;