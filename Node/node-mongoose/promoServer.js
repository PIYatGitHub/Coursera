/**
 * Created by Peter on 31.7.2017 г..
 */
var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Promotions.create({
        name: 'Weekend grand buffet',
        image:'some hardcoded image here..',
        price:"19.99",
        label:"NEW",
        description: 'Some large amount of food for your office slaves... '
    }, function (err, promotion) {
        if (err) throw err;
        console.log('Promotion created!');
        console.log(promotion);

        var id = promotion._id;

        // get all the dishes
        setTimeout(function () {
            Promotions.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Some large amount of food for your office slaves... and STUFFF '
                }
            }, {
                new: true
            })
                .exec(function (err, promotion) {
                    if (err) throw err;
                    console.log('Updated Promotion!');
                    console.log(promotion);

                    promotion.save(function (err, promotion) {
                        // I will just skip te second printing of the promotion...
                        // console.log('Updated Promotion!');
                        // console.log(promotion);

                        db.collection('promotions').drop(function () {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });
});