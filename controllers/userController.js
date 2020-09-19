const User = require("../models/User");
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    const { email, password } = req.body;
    try {
        //validate user
        //create user
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({msg: 'El usuario ya existe'})
        }
        user = new User(req.body);

        //hashed password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //save it
        await user.save();
        
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
        console.log(error);
        res.status(400).send('hubo un error');
    }
}