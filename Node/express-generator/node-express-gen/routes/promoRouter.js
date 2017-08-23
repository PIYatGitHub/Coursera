/**
 * Created by FM2A on 27.7.2017 г..
 */
    var express = require('express');
    var bodyParser = require('body-parser');
    var promoRouter = express.Router();// we have to create our new Router manually - serves as mini REST API
    promoRouter.use(bodyParser.json()); // then it has to use the JSON PARSER

    promoRouter.route('/') // here we use it, but the URL is only /
        .all(function(req,res,next) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            next();
        })
        .get(function(req,res,next){
            res.end('Will send all the promotions to you!');
        })
        .post(function(req, res, next){
            res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
        })
        .delete(function(req, res, next){
            res.end('Deleting all promotions!');
        });

    promoRouter.route('/:promoId') // now handle the id situation ...
        .all(function(req,res,next) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            next();
        })
        .get(function(req,res,next){
            res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
        })
        .put(function(req, res, next){
            res.write('Updating the promotion: ' + req.params.promoId + '\n');
            res.end('Will update the promotion: ' + req.body.name +
                ' with details: ' + req.body.description);
        })
        .delete(function(req, res, next){
            res.end('Deleting promotion: ' + req.params.promoId);
        });
    module.exports= promoRouter;

