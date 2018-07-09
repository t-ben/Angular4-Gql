/**
 * this is an in memory mock data layer. it will be removed later.
 */
const moment = require('moment');

let data = [
  {
    'id': '1',
    'name': 'Jason Weyenberg',
    'capacity': 40,
    'engagements': [
      {
        'id': '3',
        'name': 'Hypertention Eng',
        'incentive': '111',
        'cost': '890',
      },
      {
        'id': '1',
        'name': 'Health Reminder',
        'incentive': '222',
        'cost': '300',
      },
    ],
  },
  {
    'id': '2',
    'name': 'Jane Campbell',
    'capacity': 20,
    'engagements': [],
  },
];

// remarked: RE engagements should be given from UI as component parameter
// let engagements = [
//   {id: '1', name: 'Health Reminder'},
//   {id: '2', name: 'Appointment Reminder Eng'},
//   {id: '3', name: 'Hypertention Eng'},
// ];

module.exports = {
  // getEngagements: () => {
  //   return engagements;
  // },
  getProviders: () => {
    return data;
  },
  getProviderById: (id) => {
    return data.find((item) => item.id == id);
  },
  addProvider: (model) => {
    let a = Object.assign({
      id: data.length + 1,
      createdAt: moment().toISOString(),
      status: 'ACTIVE',
    }, model);
    data.push(a);
    return a;
  },
  // addEngagement: (engagementInput) => {
  //   // this actually adds an engagement config for a provider. not engagement.
  //   const newOne = {
  //     createdAt: moment().toISOString(),
  //   };
  //   const engagement = engagements.find((e) => e.id == engagementInput.id);
  //   if (!engagement) {
  //     throw new Error('invalid engagement id. must be one of the known engagements.');
  //   }
  //   let newEngConfig = Object.assign({
  //     incentive: engagementInput.incentive,
  //     cost: engagementInput.cost,
  //   }, newOne, engagement);
  //   const provider = data.find((item) => item.id == engagementInput.providerId);
  //   provider.engagements.push(newEngConfig);
  //   return newEngConfig;
  // },
  // getEngagementsByProviderId: (id) => {
  //   const provider = data.find((item) => item.id == id);
  //   return provider.engagements;
  // },
  // getEngagementsByIds: (engagementsIds) => {
  //   return engagements.filter((item) => engagementsIds.indexOf(item.id) > -1);
  // },
};
