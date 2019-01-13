const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    person_id : {
        type: Number
    },
    person_name: {
        type: String
    },
    person_age: {
        type: Number
    },
    person_salary: {
        type: Number
    },
    person_address: {
        type: String
    }
},{
    collection: 'user'
});

module.exports = mongoose.model('User', User)