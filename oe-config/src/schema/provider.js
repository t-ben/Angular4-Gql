// eslint-disable-next-line
module.exports = () => [Provider, EngagementConfig]; //ActionResult
// exporting Provider and all its dependencies schemas.
// note export before require - this is needed for the apollo graphql-tools
//  to resolve cyclical refs.

// require dependencies schemas:
// const ActionResult = require('./actionResult');
const EngagementConfig = require('./engagement');

// define Provider type
// note the type Query / type Mutation declared only once without "extend"
// (Provider in this case, it doesnt matter what model).
const Provider = `
    # Provider Model
    type Provider {
      id: ID!      
      name: String!      
      capacity: Int     
      engagements: [EngagementConfig]      
    }

    # the input object definition for creating
    input AddProviderInput {
      id: ID!      
      name: String!
      capacity: Int
    }
    
    # queries
    type Query {
      # get all
      getProviders: [Provider]        
      # get by id
      getProviderById(id: ID!): Provider      
    }

    # user mutations
    type Mutation {        
      addProvider( model: AddProviderInput! ): Provider!
    }
  `;
