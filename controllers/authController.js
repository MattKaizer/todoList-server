const User = require("../models/User");
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
    // verify errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }

    const { email, password } = req.body;

    try {
        // if register user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }
        // verifying password
        const correctpassword = await bcryptjs.compare(password, user.password);
        if(!correctpassword)
            return res.status(400).json({msg: 'Password Incorrecto'});

                //create and save jwt
                const payload = {
                    user: {
                        id: user.id
                    }
                };
                //sign token
                jwt.sign(payload, process.env.SECRETWORD, {
                    expiresIn: 1800
                }, (error, token) => {
                    if(error) throw error;
                    //confirm message
                    res.json({token});
                });    
    } catch (error) {
        console.log(error)
    }
}