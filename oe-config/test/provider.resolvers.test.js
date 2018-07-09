const chai = require('chai');
const should = chai.should(); // eslint-disable-line no-unused-vars

const resolvers = require('../src/schema/providerResolvers');
const fakeData = {
    getProviders: () => {
        return [
            {id: 1, name: 'A'},
            {id: 2, name: 'B'},
            {id: 3, name: 'C'},
            {id: 4, name: 'D'},
            {id: 5, name: 'E'},
        ];
    },
};
const context = {data: fakeData};
describe('providerResolvers test', () => {
    it('getProviders resolver', () => {
        const result = resolvers.Query.getProviders('', {}, context);
        result.should.be.ok;
    });
});
