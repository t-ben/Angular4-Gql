const chai = require('chai');
const should = chai.should(); // eslint-disable-line no-unused-vars
const {validate} = require('../src/data/providerConfigValidator');
let providerConfigInput = {};
describe('test validation', () => {
    beforeEach(() => {
        providerConfigInput = {
            providerId: '1',
            capacity: 10,
            engagements: [
                {
                    id: '1',
                    name: 'ENG 1',
                    incentive: '10',
                    cost: '23',
                },
                {
                    id: '2',
                    name: 'ENG 2',
                    incentive: '340',
                    cost: '323',
                },
            ],
        };
    });
    it('providerConfigValidator - valid input works', () => {
        const errors = validate(providerConfigInput);
        (errors == null).should.be.ok;
    });
    it('valid input - empty engagements (delete all) works', () => {
        providerConfigInput.engagements = [];
        const errors = validate(providerConfigInput);
        (errors == null).should.be.ok;
    });
    it('engagement must be unique', () => {
        providerConfigInput.engagements[1].id = providerConfigInput.engagements[0].id;
        const errors = validate(providerConfigInput);
        errors.length.should.be.ok;
        (errors[0].field === 'engagements').should.be.ok;
    });
    /**
     * note: presence of required fields and the type of the value are also
     * validated by graphql schema.
     */
    it('capacity cannot be null', () => {
        providerConfigInput.capacity = null;
        const errors = validate(providerConfigInput);
        errors.length.should.be.ok;
        errors[0].field.should.equal('capacity');
        errors[0].message.should.equal('capacity cannot be null');
    });
    it('capacity cannot be empty', () => {
        providerConfigInput.capacity = '';
        const errors = validate(providerConfigInput);
        errors.length.should.be.ok;
        errors[0].field.should.equal('capacity');
        errors[0].message.should.equal('capacity cannot be empty');
    });
    it('providerId cannot be null', () => {
        providerConfigInput.providerId = null;
        const errors = validate(providerConfigInput);
        errors.length.should.be.ok;
        errors[0].field.should.equal('providerId');
        errors[0].message.should.equal('providerId cannot be null');
    });
    it('providerId cannot be empty', () => {
        providerConfigInput.providerId = '';
        const errors = validate(providerConfigInput);
        errors.length.should.be.ok;
        errors[0].field.should.equal('providerId');
        errors[0].message.should.equal('providerId cannot be empty');
    });
});


