// eslint-disable-next-line
module.exports = () => [ActionResultEnum];
// note export before require - this is needed for the apollo graphql-tools
//  to resolve cyclical refs.

const ActionResultEnum = `  
    enum ActionResultEnum {
      # OK means operation succeded
      OK
      ERROR
    }`;
