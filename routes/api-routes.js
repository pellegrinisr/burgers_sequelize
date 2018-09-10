var db = require('../models');

module.exports = function(app) {
    //Burger Routes
    
    //CREATE
    app.post('/api/burgers', function(req, res) {
        db.Burger.create({
            burger_name: req.body.burger_name,
            devoured: req.body.devoured,
            image_url: req.body.image_url,
            CustomerId: req.body.CustomerId
        }).then(function(result) {
            return res.status(200).end();
        }).catch(function(error) {
            return res.status(404).end();
        });
    });
    //READ
    app.get('/api/burgers', function(req, res) {
        debugger;
        db.Burger.findAll({}).then(function(result) {
            var handlebarsObj = {
                burgers: result
            };
            console.log(handlebarsObj);
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

    //Customer Routes

    //READ all customers for main customer page
    app.get('/', function(req, res) {
        db.Customer.findAll({}).then(function(result) {
            var handlebarsObj = {
                customers: result
            }
            res.render('customer-index', handlebarsObj)
        }); 
    });
    //READ all customers and return json
    //for the customer name selector on the 
    //index.handlebars (main burger page)
    app.get('/api/customers', function(req, res) {
        db.Customer.findAll({}).then(function(result) {
            res.json(result);
        }).catch(function(error) {
            return res.status(404).end();
        });
    });
    //DELETE
    app.delete('/api/customers/:id', function(req, res) {
        db.Customer.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(result) {
            return res.status(200).end();
        }).catch(function(error) {
            console.log(error);
            return res.status(500).end();
        });
    });
    //POST
    //add new customer
    app.post('/api/customers', function(req, res) {
        db.Customer.create(req.body).then(function(result) {
            return res.status(200).end();
        }).catch(function(error) {
            return res.status(404).end();
        });
    });
    //PUT
    //update customer
    app.put('/api/customers/:id', function(req, res) {
        db.Customer.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function(result) {
            return res.status(200).end();
        }).catch(function(error) {
            return res.status(404).end();
        })
    })
};