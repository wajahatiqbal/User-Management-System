const express = require('express');

const userRoutes = express.Router();

// 
let User = require('./user.model')
// Defined store route
userRoutes.route('/add').post(function (req, res) {

    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({ 'user': 'user is added successfully' });
            console.log(req.body)
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
            console.log(err)
        });
});

// Defined get data(index or listing) route
userRoutes.route('/').get(function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});

// Filtered Data
userRoutes.route('/filter').get(function (req, res) {
    console.log(req.query)
    User.find({ person_age: { ['$' + req.query.operator.toLowerCase()]: req.query.age } }, null, // Columns to Return
        {

            sort: {
                person_age: -1 //Sort by Added DESC
            }
        }, function (err, users) {
            if (err) {
                console.log(err);
            }
            else {
                res.json(users);
            }
        })

})

//Sort Data
userRoutes.route('/sort').get(function (req, res) {
    console.log(req.query)
    User.find({},null,
        {
            sort: {
                person_age: -1 //Sort by Added DESC
            }
        }, function (err, users) {
            if (err) {
                console.log(err);
            }
            else {
                res.json(users);
            }
        })

})







// Defined edit route
userRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
});

//  Defined update route
userRoutes.route('/update/:id').post(function (req, res) {

    User.findById(req.params.id, function (err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else {
            //user.set(req.body)
            user.person_id = req.body.person_id;
            user.person_name = req.body.person_name;
            user.person_age = req.body.person_age;
            user.person_salary = req.body.person_salary;
            user.person_address = req.body.person_address

            user.save().then(user => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
userRoutes.route('/delete/:id').get(function (req, res) {
    User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

//

module.exports = userRoutes