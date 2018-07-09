const {GraphQLError} = require('graphql');
/* eslint-disable require-jsdoc */
class ValidationError extends GraphQLError {
    constructor(errors) {
        super('invalid request');
        this.state = {};
        errors.forEach((err) => {
            const propName = err.field ? err.field : '';
            if (err.engagement) {
                // engagement err
                if (!this.state.engagements) {
                    this.state.engagements = [];
                }
                const {id, field, message} = err;
                this.state.engagements.push({id, field, message});
            } else {
                if (!this.state[propName]) {
                    this.state[propName] = [];
                }
                this.state[propName].push(err.message);
            }
        });
    };
}

module.exports = ValidationError;

/* eslint-enable require-jsdoc */
