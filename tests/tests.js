'use strict';
var expect = require('chai').expect;

describe('tests', function () {
    before(function () {
        this.locware = require('./../lib');
    });

    it('simple', function(done) {
        var res = { locals: {} };
        var middleware = this.locware('simple', function(cb) {
            cb(null, 1);
        });

        middleware({}, res, function(err) {
            expect(res.locals.simple).equal(1);
            done();
        });
    });

    it('with params', function(done) {
        var res = { locals: {} };
        var middleware = this.locware('plus2', [ 'req.x' ], function(x, cb) {
            cb(null, x + 2);
        });

        middleware({ x: 2 }, res, function(err) {
            expect(res.locals.plus2).equal(4);
            done();
        });
    });

    it('with function', function(done) {
        var res = { locals: {} };
        var middleware = this.locware('val', function(cb) {
            cb(null, this.req.x);
        });

        middleware({ x: 3 }, res, function(err) {
            expect(res.locals.val).equals(3);
            done();
        });
    });
});