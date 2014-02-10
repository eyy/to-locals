module.exports = function toLocals(ctx, fn, params, key) {
    if ('function' == typeof ctx || 'string' == typeof ctx)
        key = params, params = fn, fn = ctx;

    else if ('function' != typeof fn)
        fn = ctx[fn];

    if (!Array.isArray(params))
        key = params, params = [];

    else if (params.length)
        params = params.map(function(p) {
            return p.split('.');
        });

    return function (req, res, next) {
        var args = [],
            cb = function toLocalsCallback(err, result) {
                res.locals[key] = result;
                next(err);
            };

        cb.req = req, cb.res = res;

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

        fn.apply(ctx, args);
    }
};
