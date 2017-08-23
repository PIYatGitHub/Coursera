/**
 * Created by FM2A on 27.7.2017 г..
 */


    var express = require('express');
    var bodyParser = require('body-parser');
    var dishRouter = express.Router();// we have to create our new Router manually - serves as mini REST API
        dishRouter.use(bodyParser.json()); // then it has to use the JSON PARSER

    dishRouter.route('/') // here we use it, but the URL is only /
        .all(function(req,res,next) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            next();
        })
        .get(function(req,res,next){
            res.end('Will send all the dishes to you!');
        })
        .post(function(req, res, next){
            res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
        })
        .delete(function(req, res, next){
            res.end('Deleting all dishes');
        });

        dishRouter.route('/:dishId') // now handle the id situation ...
            .all(function(req,res,next) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                next();
            })
            .get(function(req,res,next){
                res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
            })
            .put(function(req, res, next){
                res.write('Updating the dish: ' + req.params.dishId + '\n');
                res.end('Will update the dish: ' + req.body.name +
                    ' with details: ' + req.body.description);
            })
            .delete(function(req, res, next){
                res.end('Deleting dish: ' + req.params.dishId);
            });
    module.exports=dishRouter;

