/**
 * Created by Peter on 1.7.2017 г..
 */
'use strict';

describe('conFusion App E2E Testing', function() {
    it('should automatically redirect to / when location hash/fragment is empty', function() {

        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch("/"); //no exclamation mark ???

        describe('index', function() {
            beforeEach(function() {
                browser.get('index.html#!/');//no exclamation mark ???
            });

            it('should have a title', function() {
                expect(browser.getTitle()).
                toEqual('Ristorante Con Fusion');
            });
        });
    });
    describe('menu 0 item', function() {
        beforeEach(function() {
            browser.get('index.html#!/menu/0');//no exclamation mark ???
        });

        it('should have a name', function() {
            var name = element(by.binding('dish.name'));
            expect(name.getText()).
            toEqual('Uthapizza Hot $4.99');
        });

        it('should show the number of comments as', function() {
            expect(element.all(by.repeater('newComment in dish.comments'))
                .count()).toEqual(5);

        });

        it('should show the first comment author as', function() {
            element(by.model('searchBy')).sendKeys('author');
            expect(element.all(by.repeater('newComment in dish.comments'))// OK@@
                .count()).toEqual(5);
            var author = element.all(by.repeater('newComment in dish.comments'))
                .first().element(by.binding('newComment.author'));

            expect(author.getText()).toContain('25 Cent');

        });
    });


});
