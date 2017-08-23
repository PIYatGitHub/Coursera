/**
 * Created by Peter on 31.7.2017 г..
 */
var mongoose = require('mongoose'),
    assert = require('assert');

var Leaders = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Leaders.create({
        name: 'Alberto - the EPIC SAX 112312GUY',
        image:'some hardcoded image 122here..',
        designation:"KOOKING 3122likE CrAzy (if it has no typos there is NO FUN!!!!",
        abbr:"CNC (stands for321 2CRAZY NEW CHEF)",
        description: 'Some wi12cke2d Russian prizon koockiing ckills... '
    }, function (err, leader) {
        if (err) throw err;
        console.log('Leader created!');
        console.log(leader);

        var id = leader._id;

        // get all the dishes
        setTimeout(function () {
            Leaders.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Some large amount of food for your office slaves... and STUFFF '
                }
            }, {
                new: true
            })
                .exec(function (err, leader) {
                    if (err) throw err;
                    console.log('Updated Leader!');
                    console.log(leader);

                    leader.save(function (err, leader) {
                        // I will just skip te second printing of the promotion...
                        // console.log('Updated Promotion!');
                        // console.log(promotion);

                        db.collection('leaders').drop(function () {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });
});