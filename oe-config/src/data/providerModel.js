const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new Schema({
    id: {type: String, require: true},
    name: {type: String, require: true},
    capacity: {type: Number, require: true},
    engagements: [{
        id: {type: String, require: true},
        name: {type: String, require: true},
        incentive: {type: Number, require: true},
        cost: {type: Number, require: true},
    }],
});

module.exports = mongoose.model('Provider', providerSchema);

