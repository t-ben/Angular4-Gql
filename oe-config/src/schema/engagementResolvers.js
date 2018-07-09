
const resolvers = {
  // Query: {
  //   getEngagements: (_, { }, {data}) => data.getEngagements(),
  // },
  Mutation: {
    // addEngagement: (_, {model}, {data}) => data.addEngagement(model),
    updateProviderConfig: (_, {providerInput}, {data}) =>
      // TODO: call validation here no mongoose v.
      // throw a GraphQLError
      data.updateProviderConfig(providerInput),
  },
};
module.exports = resolvers;
