/**
 * Created by FM2A on 27.7.2017 г..
 */

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Favorites = require('../models/favorites');
var Verify = require('./verify');
var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        Favorites.find({})
            .populate('postedBy')
            .populate('dishes')
            .exec(function (err, favorite) {
                if (err) throw err;
                res.json(favorite);
            });
    })
    .post(function (req, res, next) {
        if (req.decoded._doc._id){ // dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id
            Favorites.findOne({postedBy:req.decoded._doc._id},function (err, favorite) {
                if (err) throw err;
                if (favorite && favorite.dishes){
                    favorite.dishes.push(req.body);
                    favorite.save(function (err, favorite) {
                        if (err) throw err;
                        res.json(favorite);
                    });
                }else {
                    Favorites.create(req.body, function (err, favorite) {
                        if (err) throw err;
                        //req.body.postedBy=req.decoded._doc._id; // get the user ID
                        favorite.dishes.push(req.body);
                        favorite.postedBy=req.decoded._doc._id;

                        favorite.save(function (err, favorite) {
                            if (err) throw err;

                            res.json(favorite);
                        });
                    });
                }
            });
        }
    })

    .delete(function (req, res, next) {
        Favorites.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

favoriteRouter.route('/:favoriteId')
    .all(Verify.verifyOrdinaryUser)

    .delete(function (req, res, next) {
        Favorites.findOne(function (err, favorite) {
             var userDish=favorite.dishes;
             for(var i = 0; i < userDish.length; i++){
                 if(userDish[i] == req.params.favoriteId) {
                     userDish.splice(i, 1);
                     break;
                 }
            }

            favorite.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });
    });
module.exports = favoriteRouter;

/*
* var express = require('express');
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');

 var Favorites = require('../models/favorites');
 var Verify = require('./verify');

 var favoriteRouter = express.Router();
 favoriteRouter.use(bodyParser.json());
 favoriteRouter.route('/')
 // populate the user information and the dishes information before returning the favorites to the user.
 .get(Verify.verifyOrdinaryUser, function (req, res, next) {//ordinrayuser is required
 Favorites.findOne({ user: req.decoded._doc._id })
 .populate('user')
 .populate('dishes.dish_id')
 .exec(function (err, favorite) {
 if (err) throw err;
 res.json(favorite);
 });
 })

 .post(Verify.verifyOrdinaryUser, function (req, res, next) {
 userid = req.decoded._doc._id;


 Favorites.findOne({ user: userid }, function (err, favorite) {
 if (err) throw err;
 // if the user's favorite is already exists ,push the dish'id to the favorite list
 if (favorite) {
 existflag = false;
 for (i in favorite.dishes) {
 console.log(favorite.dishes[i]);
 if (favorite.dishes[i]['dish_id'] == req.body._id) {
 existflag = true;
 break;
 }
 }
 console.log(existflag);
 // if the dish is already exists ,push
 if (!existflag) {
 favorite.dishes.push({ dish_id: req.body._id });
 favorite.save(function (err, favorite) {
 if (err) throw err;
 console.log('Updated favorite!');
 res.json(favorite);
 });
 }
 // else do nothing  and return the message
 else {
 res.writeHead(200, {
 'Content-Type': 'text/plain'
 });
 res.end('the favorite for the user already exists');
 }

 }
 // the the user has not any favorite,create the use and the favorite dish
 else {
 Favorites.create({ user: userid, dishes: [{ dish_id: req.body._id }] }, function (err, favorite) {
 if (err) throw err;
 console.log('user favorite created!');
 var id = favorite._id;
 res.writeHead(200, {
 'Content-Type': 'text/plain'
 });

 res.end('Added the favorite with id: ' + id);
 });

 }

 })

 })
 .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
 Favorites.remove({ user: req.decoded._doc._id }, function (err, resp) {
 if (err) throw err;
 res.json(resp);
 });
 });
 favoriteRouter.route('/:dishObjectId')
 .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
 userid = req.decoded._doc._id;

 // find the user's favorite and delete the favorite dish
 console.log(userid);
 console.log(req.params.dishObjectId);

 Favorites.findOne({ user: userid }, function (err, favorite) {
 if (err) throw err;
 existflag = false;
 dishid = null;
 //find the dishes._id
 for (i in favorite.dishes) {
 console.log(favorite.dishes[i]);
 if (favorite.dishes[i]['dish_id'] == req.params.dishObjectId) {
 existflag = true;
 dishid = favorite.dishes[i]['_id']
 break;
 }
 }
 if (existflag) {
 //delete by  dished._id
 favorite.dishes.pull(dishid);
 favorite.save(function (err, favorite) {
 if (err) throw err;
 console.log('updated favorite!');
 res.json(favorite);
 });

 }
 else {
 res.writeHead(200, {
 'Content-Type': 'text/plain'
 });
 res.end('the dish is not in the favorite list');

 }

 })
 });


 module.exports = favoriteRouter;
*
* */

/*
* var express = require('express');
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');

 var Favorite = require('../models/favorite');
 var Dish = require('../models/dishes');
 var verify = require('./verify');

 var favoriteRouter = express.Router();
 favoriteRouter.use(bodyParser.json());

 favoriteRouter.route('/')
 .all(verify.verifyOrdinaryUser)
 .get(function (req, res, next) {
 Favorite.find({'postedBy': req.decoded._doc._id})
 .populate('postedBy')
 .populate('dishes')
 .exec(function (err, favorites) {
 if (err) return err;
 res.json(favorites);
 });
 })

 .post(function (req, res, next) {

 Favorite.find({'postedBy': req.decoded._doc._id})
 .exec(function (err, favorites) {
 if (err) throw err;
 req.body.postedBy = req.decoded._doc._id;

 if (favorites.length) {
 var favoriteAlreadyExist = false;
 if (favorites[0].dishes.length) {
 for (var i = (favorites[0].dishes.length - 1); i >= 0; i--) {
 favoriteAlreadyExist = favorites[0].dishes[i] == req.body._id;
 if (favoriteAlreadyExist) break;
 }
 }
 if (!favoriteAlreadyExist) {
 favorites[0].dishes.push(req.body._id);
 favorites[0].save(function (err, favorite) {
 if (err) throw err;
 console.log('Um somethings up!');
 res.json(favorite);
 });
 } else {
 console.log('Setup!');
 res.json(favorites);
 }

 } else {

 Favorite.create({postedBy: req.body.postedBy}, function (err, favorite) {
 if (err) throw err;
 favorite.dishes.push(req.body._id);
 favorite.save(function (err, favorite) {
 if (err) throw err;
 console.log('Something is up!');
 res.json(favorite);
 });
 })
 }
 });
 })

 .
 delete(function (req, res, next) {
 Favorite.remove({'postedBy': req.decoded._doc._id}, function (err, resp) {
 if (err) throw err;
 res.json(resp);
 })
 });

 favoriteRouter.route('/:dishId')
 .all(verify.verifyOrdinaryUser)
 .delete(function (req, res, next) {

 Favorite.find({'postedBy': req.decoded._doc._id}, function (err, favorites) {
 if (err) return err;
 var favorite = favorites ? favorites[0] : null;

 if (favorite) {
 for (var i = (favorite.dishes.length - 1); i >= 0; i--) {
 if (favorite.dishes[i] == req.params.dishId) {
 favorite.dishes.remove(req.params.dishId);
 }
 }
 favorite.save(function (err, favorite) {
 if (err) throw err;
 console.log('Here you go!');
 res.json(favorite);
 });
 } else {
 console.log('No favourites!');
 res.json(favorite);
 }

 });
 });

 module.exports = favoriteRouter;
*
* */