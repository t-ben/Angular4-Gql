
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EngagementConfigSchema = new Schema({
    id: {type: String, require: true},
    name: {type: String, require: true},
    incentive: {type: Number, require: true, min: 1, max: 5000000000},
    cost: {type: Number, require: true, min: 1, max: 5000000000},
});

const providerConfig = new Schema({
    id: {type: String, require: true},
    name: {type: String, require: true},
    capacity: {type: Number, require: true, min: 0, max: 10000},
    engagements: {
        type: [EngagementConfigSchema],
    },
});

module.exports = mongoose.model('providerConfig', providerConfig, 'Provider');


