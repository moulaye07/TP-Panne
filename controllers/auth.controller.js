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


module.exports.signIn = async (req, res) => {
    const {nom, prenom, password} = req.body

    try {
        const user = await UserModel.login(nom, prenom, password);
        if (user.errorPassword) {
            const errors = {nom:'', prenom:'', password:'mot de passe inconnu'}
            res.status(200).json({errors}); 
        } else {
            const token = createToken(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge});
            res.status(200).json({ user: user._id })
        }
    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).json({errors});  
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge : 1});
    res.redirect('/');
}