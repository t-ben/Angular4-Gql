import { Component } from '@angular/core';
// apollo setup:

import { InMemoryCache } from 'apollo-cache-inmemory';
import { Engagement } from './provider-list/types';

const apiUrlExpression = 'window.platform ? window.platform.getEnvVars().NG_OE_API_URL : \'http://localhost:3000/graphql\'';
const _apiUrl: string = eval(apiUrlExpression);
//
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
 engagements: Engagement[] = [
    { id: '1', name: 'Health Reminder', isActive: true },
    { id: '2', name: 'Appointment Reminder Eng', isActive: true },
    { id: '3', name: 'Hypertention Eng', isActive: true },
  ];
  apiUrl: string = _apiUrl;
}
