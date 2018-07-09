const chai = require('chai');
const should = chai.should(); // eslint-disable-line no-unused-vars
const graphql = require('graphql');
const {makeExecutableSchema} = require('graphql-tools');
const provSchema = require('../src/schema/provider');
const engSchema = require('../src/schema/engagement');
const providerSchema =
  makeExecutableSchema({typeDefs: [provSchema, engSchema]});

describe('schema tests', () => {
  it('provider schema fields', () => {
    providerSchema.should.be.ok;
    const fields = providerSchema.getType('Provider').getFields();
    fields.capacity.should.be.ok;
    fields.capacity.type.name.should.equal('Int');
    // TODO: other fields
  });
  it('getProviders schema queries', () => {
    const query = providerSchema.getQueryType();
    query.should.be.ok;
    query.getFields().getProviders.type.ofType.name.should.equal('Provider');
    query.getFields().getProviders.type.should
      .deep.equal(graphql.GraphQLList(providerSchema.getType('Provider')));
    // TODO: other queries
  });
});

/**
 * https://www.apollographql.com/docs/graphql-tools/mocking.html:
 * import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';

// Fill this in with the schema string
const schemaString = `...`;

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema });

const query = `
query tasksForUser {
  user(id: 6) { id, name }
}
`;

graphql(schema, query).then((result) => console.log('Got result', result))
 */
