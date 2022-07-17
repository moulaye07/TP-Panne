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


module.exports.updatePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id);
    
    const newDescription = {
        description: req.body.description,
        batiment: req.body.batiment,
        chambre: req.body.chambre
    }
    
    postModel.findByIdAndUpdate(
        req.params.id,
        {$set: newDescription},
        {new: true},
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("erreur de mise à jour "+err);
        }
    )
}

module.exports.deletePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id);
    
    postModel.findByIdAndRemove(req.params.id, (err, docs)=>{
        if(!err) res.send(docs);
        else console.log("erreur de suppression "+ err);
    })
    
}

module.exports.setState = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id);
    const newState = {
        etat: req.body.etat
    }
    postModel.findByIdAndUpdate(
        req.params.id,
        {$set: newState},
        {new: true},
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("erreur de mise à jour "+err);
        }
    )
}



