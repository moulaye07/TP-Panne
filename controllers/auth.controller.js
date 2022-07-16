const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { create } = require('../models/user.model');
const {signUpErrors, signInErrors} = require('../utils/errors.utils');


module.exports.signUp = async (req, res) => {
    console.log(req.body)
    const {nom, prenom, password, role} = req.body
    try {
        const user = await UserModel.create({nom, prenom, password, role});
        res.status(201).json({ user : user._id});
    }
    catch(err) {
        const errors = signUpErrors(err);
        res.status(200).send({errors})
    }
}

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};
