// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { AppComponent } from './app/app.component';
import { ProviderList } from './app/provider-list/provider.list.component';
import { BrowserModule } from '@angular/platform-browser';
import { GraphQLModule } from './app/graphql.module';
import { ApolloModule, Apollo } from 'apollo-angular';
import { EngagementList } from './app/engagement-list/engagement.list.component';

beforeAll(() => TestBed.configureTestingModule({
  declarations: [
    AppComponent,
    ProviderList,
    EngagementList,
  ],
  imports: [
    BrowserModule,
    // Apollo:
    ApolloModule,
    GraphQLModule
  ],
  providers: []
}));
declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, ApolloModule],
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
