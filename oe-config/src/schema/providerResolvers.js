
const resolvers = {
  Query: {
    getProviders: (_, params, {data}) => {
      return data.getProviders();
    },
    getProviderById: (_, {id}, {data}) => {
      return data.getProviderById(id);
    },
  },
  Mutation: {
    addProvider: (_, {model}, {data}) => {
      return data.addProvider(model);
    },
  },
  Provider: {
    engagements: (currentObj, args, {data}) => {
      // resolve references:
      return currentObj.engagements; // no need to specifically read since its a subdoc in mongo
    },
  },
};
module.exports = resolvers;
