module.exports = {
  examplesText: `
  query GetAllProviders {
    getProviders {
      id
      name      
      capacity        
      engagements {
        id        
        name        
        incentive
        cost
      }
    }
  }
  
  # UpdateEngagements: update engagements of a provider
  # send empty array to delete all []
  # simply replaces the provider.engagements with given input array of engagement/s.

  mutation UpdateProviderConfig {
    updateProviderConfig( 
      providerInput: {
        providerId: "1"
        capacity: 20
        engagements: [
          {
            id: "1"
            name: "ENG 1"
            incentive: "10"
            cost: "23"
          },
          {
            id: "2"
            name: "ENG 2"      
            incentive: "340"
            cost: "323"
          }
        ]
      } 
    ) {
        result
        message
        errors  {
          id
          field
          message
      }
    }
  }

  #temp helper queries - we will remove these
  query ProviderById {
     getProviderById(id: "1"){
      id
      name      
      capacity        
      engagements {
        id        
        name        
        incentive
        cost
      }
    }
  }
  
  mutation AddProvider {
    addProvider(model: {
      name: "Sam"      
      id: "123"
      capacity: 20
    }) {
      id
    }
  }
  `,
};
