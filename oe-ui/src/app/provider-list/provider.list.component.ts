import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
// import { Observable } from 'rxjs/Observable';
// import { map } from 'rxjs/operators';
import { GET_PROVIDERS, UPDATE_PROVIDER_CONFIG } from './graphql.queries';
import { Provider, Query, Engagement, EngagementConfigData, ProviderInput } from './types';
import { Subscription } from 'apollo-client/util/Observable';

@Component({
  selector: 'provider-list',
  templateUrl: './provider.list.component.html'
})
export class ProviderList implements OnInit, OnDestroy {
  constructor(private apollo: Apollo) { }

  @Input() engagements: Engagement[];
  @Input() apiUrl: string;

  // providers:Observable<Provider[]>;
  providers: Provider[] = [];

  allSelected = false;
  isLoading = true;
  subscriptions: Subscription[] = [];

  selectAllClicked() {
    this.allSelected = !this.allSelected;
    this.providers.forEach(p => p.isSelected = this.allSelected);
  }
  ngOnInit() {
    const providersSubscription = this.apollo.watchQuery<Query>({
      query: GET_PROVIDERS,
    }).valueChanges.subscribe(response => {
      this.isLoading = response.loading;
      const list = response.data.getProviders;

      this.providers = list.map((p) => { return { ...p, isSelected: false, isExpanded: false }; });
    });
    this.subscriptions = [...this.subscriptions, providersSubscription];
  }
  saveProviderConfig(): Function {
    // closure func returned to be used by child component.
    return (providerInput: ProviderInput) => {
      const mutationSubscription = this.apollo.mutate({
        mutation: UPDATE_PROVIDER_CONFIG,
        variables: {
          providerInput
        },
        update: (store, { data: { updateProviderConfig } }) => {
          if (updateProviderConfig.result === 'OK') {
            this.updateStoreAfterSave(store, updateProviderConfig, providerInput);
          }
        }
      }).subscribe();
      this.subscriptions = [...this.subscriptions, mutationSubscription];
    };
  }
  updateStoreAfterSave(store, updateProviderConfig, providerInput: ProviderInput) {
    const data = store.readQuery({
      query: GET_PROVIDERS
    });
    const provider = data.getProviders.find(p => p.id === providerInput.providerId);
    // update providerInput values to Provider in cache:
    provider.capacity = providerInput.capacity;
    provider.engagements =
      providerInput.engagements.map((e) => {
        return { ...e, __typename: 'EngagementConfig' };
      });
    store.writeQuery({ query: GET_PROVIDERS, data });
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe();
      }
    }
  }
}
