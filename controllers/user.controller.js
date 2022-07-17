const { send } = require('express/lib/response');
const userModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req,res) => {
    const users = await userModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userData = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id)

    userModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('Identifiant inconnu : ' + err);

    }).select('-password');
}