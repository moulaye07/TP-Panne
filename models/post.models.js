const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        idOfPoster: {
            type: String,
            required: true
        },
        description: {
            type: String,
            trim: true,
            maxlength: 700
        },
        batiment: {
            type: String,
            trim: true,
            maxlength: 700
        },
        
        chambre: {
            type: String,
            trim: true,
            maxlength: 700
        },
        etat: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model('post', postSchema);