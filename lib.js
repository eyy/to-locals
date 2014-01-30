module.exports = function locware(key, params, fn) {
    if ('function' == typeof params)
        fn = params, params = [];

    else if (params.length)
        params = params.map(function(p) {
            return p.split('.');
        });

    return function (req, res, next) {
        var args = [],
            cb = function (err, result) {
                res.locals[key] = result;
                next(err);
            };

        cb.req = req;
        cb.res = res;

        if (params.length)
            params.forEach(function (p) {
                var val = cb;
                p.some(function(key) {
                    val = val[key];
                    return val == null;
                });
                args.push(val);
            });

        args.push(cb);

        fn.apply(args);
    }
};
