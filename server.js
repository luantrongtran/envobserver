var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), //created model loading here
    EnvObserver = require('./api/models/EnvObserverModel'),
    User = require('./api/models/UserModel'),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/envobserver');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(cors);


var routes = require('./api/routes/todoListRoutes'); //importing route
var envObserverRoutes = require('./api/routes/EnvObserverRoutes');
let userRoutes = require('./api/routes/UserRoutes');
routes(app); //register the route
envObserverRoutes(app);
// userRoutes(app);
app.use('/users', userRoutes);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
