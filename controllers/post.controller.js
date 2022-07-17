const postModel = require('../models/post.models');
const ObjectId = require('mongoose').Types.ObjectId; 

module.exports.readPost = (req, res) => {
    postModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log('erreur : '+ err );
    }).sort({ createdAt: -1});
}

module.exports.createPost = async (req, res) => {
    const newPost = new postModel({
        idOfPoster: req.body.idOfPoster,
        description: req.body.description,
        batiment: req.body.batiment,
        chambre: req.body.chambre,
    });
    try {
        const post = await newPost.save();
        return res.status(201).json(post);   
    } catch (err) {
        return res.status(400).send(err);
    }
}

