const chai = require('chai');
const should = chai.should(); // eslint-disable-line no-unused-vars

const ValidationError = require('../src/validationError');
let errors = [];
describe('class ValidationError', () => {
    beforeEach(() => {
        errors = [
            {engagement: 'yes', id: '1', field: 'incentive', message: 'incentive error message'},
            {engagement: 'yes', id: '1', field: 'name', message: 'name error message'},
            {engagement: 'yes', id: '2', field: 'cost', message: 'cost error message'},
            {field: 'capacity', message: 'capacity error message'}];
    });
    it('works', () => {
        const vErr = new ValidationError(errors);
        vErr.should.be.ok;
    });
});
