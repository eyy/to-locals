Locware: `res.locals`-middleware
--------------------------

Transform callback-functions into connect middlewares, dumping their content to `res.locals`.


How
===
`npm i locware`


What
====

Most node function are something like this:
```js
var getUser = function(cb) {
    cb(null, 'user');
};
```

Writing your site with express, you usually call these functions and just put their values in `res.locals`:
```js
app.get('/user', function(req, res) {
    getUser(function(err, user) {
        res.render('index', {
            user: user
        });
    });
});
```

With `locware`, it's a bit simpler:
```js
app.get('/', locware('user', getUser), function(req, res) {
    res.render('index');
});
```

It's perfect for mongoose:
```js
var users = locware('users', mongoose.model('users').find);
app.get('users', users [...]);
```

For more complicate cases you can `locware` around an anonymous function:
```js
var project = locware('project', function (cb) {
    mongoose.model('projects').findById(this.req.query.id, cb);
});
```

Or use `locware` arguments sugar:
```js
var project = locware('project', [ 'req.query.id' ], mongoose.model('projects').findById);
```
