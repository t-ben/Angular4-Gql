// eslint-disable-next-line
module.exports = () => [EngagementConfig, Provider, ValidationError, ActionResultEnum];
// exporting Engagement and all its dependencies schemas.
// note export before require - this is needed for the apollo graphql-tools
//  to resolve cyclical refs.

// require dependencies schemas:
// const ActionResult = require('./actionResult');
const ValidationError = require('./validationError');
const ActionResultEnum = require('./actionResultEnum');
const Provider = require('./provider');
// const ActionResult = require('./actionResult');

// define Provider
// note the type Query / type Mutation declared as "extend"
// cause only once we will define without extend (Provider)

const EngagementConfig = `
    # EngagementConfig model   
    type EngagementConfig {
      id: ID!
      name: String!
      incentive: String!
      cost: String!            
    }

    # the input object definition for creating/updating
    input EngagementInput {
      id: ID!
      name: String!        
      incentive: String!
      cost: String!       
    }

    input ProviderInput {
      providerId: ID!
      capacity: Int!
      engagements: [EngagementInput!]!
    }

    type UpdateProviderConfigResult {
        result: ActionResultEnum!
        message: String
        errors: [ValidationError]          
    }

    # TODO: define a response for update eng configs with errors
    # mutations
    extend type Mutation {      
      updateProviderConfig( providerInput: ProviderInput! ): UpdateProviderConfigResult!
    }
  `;

  /**
   * type Engagement {
      id: ID!
      name: String!
    }

    # queries
    extend type Query {
      getEngagements: [Engagement]
    }
   */
