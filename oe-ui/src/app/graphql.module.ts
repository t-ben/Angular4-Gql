import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// the graphql API url: TODO: get this code into a service.
// the value should be set from RE into the service, OR set from @input of ProviderList
const apiUrlExpression = 'window.platform ? window.platform.getEnvVars().NG_OE_API_URL : \'http://localhost:3000/graphql\'';
const uri = eval(apiUrlExpression);

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    // create Apollo
    apollo.create({
      link: httpLink.create({ uri }),
      cache: new InMemoryCache()
    });
  }
}
