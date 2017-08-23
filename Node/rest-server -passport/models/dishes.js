/**
 * Created by Peter on 31.7.2017 г..
 */
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency; // just so that we don't have to type it
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});
// create a schema
var dishSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type:String,
            required:true,
            unique:true
        },
        category:{type:String,
            required:true,
            unique:false},
        label:{
            type:String,
            default: ""
            // all mongoose schema fields are optional by default
        },
        price:{
            type:Currency,
            required:true
        },
        description: {
            type: String,
            required: true
        },
        comments:[commentSchema]
    },
        {
        timestamps: true
    });

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to our Node applications
module.exports = Dishes;