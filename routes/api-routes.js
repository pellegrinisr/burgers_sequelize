var db = require('../models');

module.exports = function(app) {
    //CREATE
    app.post('/api/burgers', function(req, res) {
        db.Burger.create({
            burger_name: req.body.burger_name,
            devoured: req.body.devoured,
            image_url: req.body.image_url
        }).then(function(result) {
            res.status(200).end();
        }).catch(function(error) {
            return res.status(404).end();
        });
    });
    //READ
    app.get('/api/burgers', function(req, res) {
        db.Burger.findAll({}).then(function(result) {
            var handlebarsObj = {
                burgers: result
            }
            res.render('index', handlebarsObj);
        });
    });
    //UPDATE
    app.put('/api/burgers/:id', function(req, res) {
        db.Burger.update({
            devoured: req.body.devoured
        },
        {
            where: {
                id: req.params.id
            }
        }).then(function(result) {
            return res.status(200).end();
        }).catch(function(error) {
            return res.status(404).end();
        });
    });
    //DELETE
    app.delete('/api/burgers/:id', function(req, res) {
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(result) {
            return res.status(200).end();
        }).catch(function(error) {
            return res.status(404).end();
        });
    });
}