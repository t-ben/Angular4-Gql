
// eslint-disable-next-line
module.exports = () => [ActionResult, ActionResultEnum];
// note export before require - this is needed for the apollo graphql-tools
//  to resolve cyclical refs.

const ActionResultEnum = require('./actionResultEnum');

const ActionResult = `
    # action result: OK / ERROR and may have a message
    type ActionResult {
      result: ActionResultEnum!
      message: String
    }
    `;


