const express = require('express');
const User = require('../models/User');
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config();
const router = express.Router();

const JWT_SECRET = process.env.SECRET_KEY;

//=============== Create user /api/auth/createuser (Login not required) ==============
router.post('/createuser', [
    body('username', 'enter a valid username min length 3').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a valid password min length 5').isLength({ min: 5 }),
    body('cPassword', 'enter a valid password min length 5').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({success, errors: error.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, errors: ["Sorry a user with this email already exist"] });
        }
        if(req.body.password!==req.body.cPassword){
            return res.status(400).json({success, errors: ["password not matched"] });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        // const authToken = jwt.sign({ data, exp: expire_time }, JWT_SECRET);
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        return res.status(200).json({success, authToken });
    } catch (error) {
        success=false
        console.error(error.message);
        res.status(500).json({success,errors:["internal server error"]});
    }
});

// ============= login user /api/auth/login (Login not required) ===============
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be blank').notEmpty(),
], async (req, res) => {
    let success = false;
    // const expire_time = Math.floor(Date.now() / 1000) + 60;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, errors: ["pls login with correct credentials"] });
        }
        const compPass = await bcrypt.compare(password, user.password);
        if (!compPass) {
            success = false;
            return res.status(400).json({ success, errors: ["pls login with correct credentials"] });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        // const authToken = jwt.sign({ data, exp: expire_time }, JWT_SECRET)
        const authToken = jwt.sign(data, JWT_SECRET)
        success=true
        return res.status(200).json({success,authToken });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success,errors:["internal server error"]});
    }
});

//============ get logged in user details (Login required) ==============
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("internal server error");
    }
});

module.exports = router;