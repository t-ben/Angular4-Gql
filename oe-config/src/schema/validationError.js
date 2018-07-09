
// eslint-disable-next-line
module.exports = () => [ValidationError];
// note export before require - this is needed for the apollo graphql-tools
//  to resolve cyclical refs.

const ValidationError = `    
    type ValidationError {
        id: ID
        field: String
        message: String
    }
`;
