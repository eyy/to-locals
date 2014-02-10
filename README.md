to-locals: `res.locals`-middleware
================================

Transform callback-functions into [connect](http://www.senchalabs.org/connect/) middlewares, dumping their content to `res.locals`.


How
---
`npm i to-locals`
```js
var toLocals = require('to-locals');

// toLocals([ctx], fn, [params], key)

toLocals(getUsers, 'users');
toLocals(getUserById, [ 'req.params.id' ], 'user');
toLocals(users, users.find, 'user');
toLocals(users, 'find', 'users');
toLocals(users, 'findById', [ 'req.params.id' ], 'user');
```


What
----

Most node function are something like this:
```js
var getUser = function(cb) {
    cb(null, 'user');
};
```

Writing your site with [express](http://expressjs.com/), you usually call these functions and just put their values in `res.locals`:
```js
app.get('/user', function(req, res) {
    getUser(function(err, user) {
        res.render('index', {
            user: user
        });
    });
});
```

With `to-locals`, it's a bit simpler:
```js
app.get('/', toLocals(getUser, 'user'), function(req, res) {
    res.render('index');
});
```

It's perfect for [mongoose](http://mongoosejs.com/):
```js
var users = toLocals(mongoose.model('users'), 'find', 'users');
app.get('users', users [...]);
```

For more complicate cases you can `to-locals` around an anonymous function:
```js
var project = toLocals(function (cb) {
    mongoose.model('projects').findById(cb.req.query.id, cb);
}, 'project');
```
Notice how `req` (and `res`) was attached to the callback!

Or use `toLocals` arguments sugar:
```js
var project = toLocals(mongoose.model('projects')), 'findById', [ 'req.query.id' ], 'project');
```

Tests
-----
Mocha with some `npm test`.

Licence
-------
MIT