const validator = require('validator');

const uniqueEngagementValidator = (engConfigs) => {
    if (engConfigs) {
        const length = engConfigs.length;
        const obj = {};

        for (let i = 0; i < length; i++) {
            if (obj[engConfigs[i].id]) {
                // repeating an engagement id is not allowed!
                return false;
            } else {
                obj[engConfigs[i].id] = 1; // make id as prop so it will be unique.
            }
        }
        return true; // ok
    }
};
const createEngagementError = (id, field, message) => {
    return {engagement: 'yes', id: id || '', field, message};
};
const validateEngagementConfig = (engConfig) => {
    const errors = [];
    if (Object.prototype.hasOwnProperty.call(engConfig, 'id')) {
        if (!engConfig.id || validator.isEmpty(engConfig.id + '')) {
            errors.push(createEngagementError(engConfig.id, 'id', 'id cannot be empty'));
        }
    } else {
        errors.push(createEngagementError('', 'id', 'id is mandatory'));
    }
    if (Object.prototype.hasOwnProperty.call(engConfig, 'name')) {
        if (!engConfig.name || validator.isEmpty(engConfig.name + '')) {
            errors.push(createEngagementError(engConfig.id, 'name', 'name cannot be empty'));
        }
    } else {
        errors.push(createEngagementError(engConfig.id, 'name', 'name is mandatory'));
    }
    if (Object.prototype.hasOwnProperty.call(engConfig, 'incentive')) {
        if (!engConfig.incentive || validator.isEmpty(engConfig.incentive + '')) {
            errors.push(createEngagementError(
                engConfig.id, 'incentive', 'incentive cannot be empty'));
        } else if (!validator.isNumeric(engConfig.incentive + '')) {
            errors.push(createEngagementError(
                engConfig.id, 'incentive', 'incentive must be a number'));
        }
    } else {
        errors.push(createEngagementError(engConfig.id, 'incentive', 'incentive is mandatory'));
    }
    if (Object.prototype.hasOwnProperty.call(engConfig, 'cost')) {
        if (!engConfig.cost || validator.isEmpty(engConfig.cost + '')) {
            errors.push(createEngagementError(engConfig.id, 'cost', 'cost cannot be empty'));
        } else if (!validator.isNumeric(engConfig.cost + '')) {
            errors.push(createEngagementError(engConfig.id, 'cost', 'cost must be a number'));
        }
    } else {
        errors.push(createEngagementError(engConfig.id, 'cost', 'cost is mandatory'));
    }
    return errors;
};
const validateEngagementConfigs = (engConfigs) => {
    const result = [];
    engConfigs.forEach((eng) => {
        const errors = validateEngagementConfig(eng);
        if (errors) {
            errors.forEach((e) => result.push(e));
        }
    });
    return result;
};
module.exports = {
    validate: (providerInput) => {
        const errors = [];

        if (Object.prototype.hasOwnProperty.call(providerInput, 'providerId')) {
            if (providerInput.providerId === null) {
                errors.push({field: 'providerId', message: 'providerId cannot be null'});
            } else {
                if (validator.isEmpty(providerInput.providerId + '')) {
                    errors.push({field: 'providerId', message: 'providerId cannot be empty'});
                }
            }
        } else {
            errors.push({field: 'providerId', message: 'providerId is mandatory'});
        }
        if (Object.prototype.hasOwnProperty.call(providerInput, 'capacity')) {
            if (providerInput.capacity === null) {
                errors.push({field: 'capacity', message: 'capacity cannot be null'});
            } else {
                if (validator.isEmpty(providerInput.capacity + '')) {
                    errors.push({field: 'capacity', message: 'capacity cannot be empty'});
                }
            }
        } else {
            errors.push({field: 'capacity', message: 'capacity is mandatory'});
        }
        if (Object.prototype.hasOwnProperty.call(providerInput, 'engagements')) {
            if (providerInput.engagements === null) {
                errors.push({field: 'engagements', message: 'engagements cannot be null'});
            } else {
                const engUniqueValid = uniqueEngagementValidator(providerInput.engagements);
                if (!engUniqueValid) {
                    errors.push({
                        field: 'engagements',
                        message: 'Engagement configs of a provider cannot repeat an engagement',
                    });
                }
                const engErrors = validateEngagementConfigs(providerInput.engagements);
                if (engErrors) {
                    engErrors.forEach((e) => errors.push(e));
                }
            }
        } else {
            errors.push({field: 'engagements', message: 'engagements is mandatory'});
        }

        return errors.length ? errors : null;
    },
};
