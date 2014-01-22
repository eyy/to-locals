module.exports = function locware(key, params, fn) {
    if ('function' == typeof params)
        fn = params, params = [];

    else if (params.length)
        params = params.map(function(p) {
            return p.split('.');
        });

    return function (req, res, next) {
        var args = [],
            ctx = { req: req, res: res, next: next };

        if (params.length)
            params.forEach(function (p) {
                var val = ctx;
                p.some(function(key) {
                    val = val[key];
                    return val == null;
                });
                args.push(val);
            });

        args.push(function (err, result) {
            res.locals[key] = result;
            next(err);
        });

        fn.apply(ctx, args);
    }
};
