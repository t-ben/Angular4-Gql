const providerModel = require('./providerConfig');

module.exports = (db) => {
  return {
    _conn: db,
    getProviders: async () => {
      try {
        const dbResult = await providerModel.find({});
        return dbResult;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    getProviderById: async (id) => {
      try {
        const dbResult = await providerModel.findOne({id: id});
        return dbResult;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    updateProviderConfig: async (providerId, capacity, engagements) => {
      try {
        const dbResult = await providerModel.findOneAndUpdate(
          {id: providerId}, // criteria
          {capacity, engagements}, // update
          {runValidators: true}); // options
        return dbResult;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    updateProvider: async (provider) => {
      try {
        const dbResult = await providerModel.findOneAndUpdate(
          {id: provider.id},
          provider);
        return dbResult;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    create: async ({id, name, capacity}) => {
      try {
        const result = await new providerModel({
          id,
          name,
          capacity,
          engagements: [],
        }).save();
        return result;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  };
};
