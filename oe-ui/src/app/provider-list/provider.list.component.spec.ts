import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { ProviderList } from './provider.list.component';
import { ApolloModule } from 'apollo-angular';
import { GraphQLModule } from '../graphql.module';
import { EngagementList } from '../engagement-list/engagement.list.component';

/**
 * TODO: notes: this test does not mock the apollo graphql client. 
 * we may need to restructure the graphql module so that apollo client will be wrapped as angular service. 
 * as a service that represent the client data layer, we could inject a mock data service into the test.
 */
describe('ProviderList Component', () => {
  let component: ProviderList;
  let fixture: ComponentFixture<ProviderList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApolloModule, GraphQLModule],
      declarations: [
        AppComponent, ProviderList, EngagementList
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create provider list component', () => {
    expect(component).toBeTruthy();
  }); 
});