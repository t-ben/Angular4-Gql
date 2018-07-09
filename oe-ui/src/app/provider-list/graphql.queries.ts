import gql from 'graphql-tag';

export const GET_PROVIDERS = gql`
query GetAllProviders{
  getProviders{
    id
    name
    capacity
    engagements{
      id
      name
      incentive
      cost
    }
  }
}
`;

export const UPDATE_PROVIDER_CONFIG = gql`
  mutation UpdateProviderConfig($providerInput: ProviderInput!) {
    updateProviderConfig(
      providerInput: $providerInput
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
`;
export interface UpdateProviderConfigResponse {
  loading: boolean;
  updateProviderConfig: {
    result: string;
    message: string;
    errors: any[];
  };
}
