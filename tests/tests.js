'use strict';
var expect = require('chai').expect,
    toLocals = require('../lib');

describe('tests', function () {

    it('simple', function(done) {
        var res = { locals: {} },
            fn = function(cb) {
                cb(null, 1)
            },
            middleware = toLocals(fn, 'simple');

        middleware({}, res, function (err) {
            expect(err).eq(null);
            expect(res.locals.simple).eq(1);
            done();
        });
    });

    it('with params', function(done) {
        var res = { locals: {} },
            fn = function(x, cb) {
                cb(null, x + 2);
            },
            middleware = toLocals(fn, [ 'req.x' ], 'plus2');

        middleware({ x: 2 }, res, function(err) {
            expect(res.locals.plus2).equal(4);
            done();
        });
    });

    it('with function', function(done) {
        var res = { locals: {} },
            fn = function(cb) {
                cb(null, cb.req.x);
            },
            middleware = toLocals(fn, 'val');

        middleware({ x: 3 }, res, function(err) {
            expect(res.locals.val).equals(3);
            done();
        });
    });

    it('preserve context', function(done) {
        var res = { locals: {} },
            User = function(name) {
                this.name = name;
                this.getName = function(cb) {
                    cb(null, this.name);
                };
            },
            user = new User('me'),
            middleware = toLocals(user, 'getName', 'name');

        middleware({ msg: 'hi' }, res, function(err) {
            expect(res.locals.name).equals(user.name);
            done();
        });
    });
});