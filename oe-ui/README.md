# OE-UI

## Quick Start
1. yarn install
2. on local development do: 

  $> yarn run postinstall:local 
  this will inject localhost values.
3. yarn start

# on server
yarn install
yarn run postinstall
yarn start


## Environment Variables
postinstall script creates src\environment\base.js file with the environment variables camel cased.
all environment variables need to start with NG_  (NG_OE / NG_RE)

# Environment Variables

Name  | Default Value
:---  | :---
NG_OE_API_URL  |   http://localhost:3000/graphql