const {validate} = require('./providerConfigValidator');
const ValidationError = require('../validationError');

module.exports = (providerRepo) => {
  const _providerRepo = providerRepo;
  return {
    getProviders: async () => {
      return await _providerRepo.getProviders();
    },
    getProviderById: async (id) => {
      return await _providerRepo.getProviderById(id);
    },
    addProvider: (model) => {
      return _providerRepo.create(model);
    },
    updateProviderConfig: async (providerConfigInput) => {
      const errors = validate(providerConfigInput);
      if (errors) {
        throw new ValidationError(errors);
      } else {
        const {providerId, capacity, engagements} = providerConfigInput;
        const dbResult =
          await _providerRepo.updateProviderConfig(providerId, capacity, engagements);

        // return a UpdateProviderConfigResult:
        if (dbResult && dbResult.id === providerId) {
          return {result: 'OK'};
        } else {
          throw new ValidationError([{
            result: 'ERROR',
            message: 'Save failed - provider not found.',
          }]);
        }
        return {result: 'OK'};
      }
    },
  };
};
