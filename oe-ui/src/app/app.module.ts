import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // FormsModule

import { AppComponent } from './app.component';
import { ProviderList } from './provider-list/provider.list.component';
// Apollo:
import { GraphQLModule } from './graphql.module';
import { EngagementList } from './engagement-list/engagement.list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProviderList,
    EngagementList,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    // Apollo:
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
