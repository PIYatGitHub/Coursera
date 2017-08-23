/**
 * Created by FM2A on 26.7.2017 г..
 */
var express = require('express');
var morgan = require('morgan');
var dishRouter=require('./dishRouter');
var promoRouter=require('./promoRouter');
var leaderRouter=require('./leaderRouter');
var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use('/dishes',dishRouter()); // and there it is --> use this dishRouter with that route (./dishes)
app.use('/promotions',promoRouter());
app.use('/leaders',leaderRouter());

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});
