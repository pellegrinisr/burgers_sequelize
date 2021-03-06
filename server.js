var express = require('express');
var bodyParser = require('body-parser');
var expressHandlebars = require('express-handlebars');
var app = express();
var PORT = process.env.PORT || 8080;

var db = require('./models');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

require('./routes/api-routes.js')(app);

db.sequelize.sync({force: false}).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});