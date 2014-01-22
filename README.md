Locware: locals-middleware
--------------------------

Transform callback-functions into connect middlewares, dumping their content to res.locals.

/*

var locware = function (key, fn) {
    return function (req, res, next) {
        fn.call({ req: req, res: res, next: next }, function (err, result) {
            res.locals[key] = result;
            next(err);
        });
    }
};


var config = locware('config', config.findOne().lean().exec),
    project = locware('project', function (cb) {
        projects.findById(this.req.query.id, cb);
    }),
    project2 = locware('project', [ 'req.query.id' ], projects.findById);

* /