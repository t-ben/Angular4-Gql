/**
 * format Graphql errors to also have state property for detailed validation errors
 */
module.exports = {
    format: (error) => ({
        message: error.message,
        state: error.originalError && error.originalError.state,
        locations: error.locations,
        path: error.path,
    }),
};
