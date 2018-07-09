import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProviderList } from './provider-list/provider.list.component';
import { ApolloModule } from 'apollo-angular';
import { GraphQLModule } from './graphql.module';
import { EngagementList } from './engagement-list/engagement.list.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApolloModule, GraphQLModule],
      declarations: [
        AppComponent, ProviderList, EngagementList
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
