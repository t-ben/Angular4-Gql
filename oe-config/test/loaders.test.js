const chai = require('chai');
const should = chai.should(); // eslint-disable-line no-unused-vars

const loaders = require('../src/data/loaders');
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
loaderFn = loaders(fakeData);

describe('loader funcs tests:', () => {
    it('getProvidersByIds', async () => {
        const result = await loaderFn.providersByIds._batchLoadFn([3, 1, 2]);
        result.should.be.ok;
        result.length.should.eql(3);
        result[0].id.should.eql(3); // return in order of given id's
        result[1].name.should.eql('A');
    });
});
