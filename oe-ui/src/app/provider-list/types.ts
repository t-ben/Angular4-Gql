import { Validators } from '@angular/forms';
import { engagementRequiredValidator } from '../engagement-list/validators';

export interface Provider {
  id: number;
  name: string;
  capacity: number;
  engagements: EngagementConfigData[];
  isSelected: boolean;
  isExpanded: boolean;
}
export interface ProviderInput {
  providerId: number;
  capacity: number;
  engagements: EngagementConfigData[];
}
export class EngagementConfigData {
  id = '-1';
  name: string = null;
  incentive: number = null;
  cost: number = null;
}

export class OEConstants {
  static readonly WHOLE_NUMBER_REGEX = /^\d+$/;
}

export class EngagementConfigView {
  constructor(data: EngagementConfigData) {
    this.id = [data.id, engagementRequiredValidator()];
    this.name = data.name;
    this.incentive = [data.incentive,
    [Validators.required,
    // Validators.pattern(OEConstants.WHOLE_NUMBER_REGEX), // not needed if html type is number
    Validators.min(1),
    Validators.max(3000000000)]
    ];
    this.cost = [data.cost,
    [Validators.required,
    // Validators.pattern(OEConstants.WHOLE_NUMBER_REGEX), // not needed if html type is number
    Validators.min(1),
    Validators.max(5000000000)]
    ];
    this.isNew = data.id === '-1' ? true : false;
  }
  id: any[];
  name: string = null;
  incentive: any[];
  cost: any[];
  status = '';
  isNew = true;

  public init(engagements: Engagement[]) {
    this.status = 'Active';
    const eng = engagements.find(e => e.id === this.id[0]);
    if (eng) {
      this.status = eng.isActive ? 'Active' : 'Inactive';
    } else {
      this.status = 'Not Available';
    }
  }
}

export interface Engagement {
  id: string;
  name: string;
  isActive: boolean;
}

// tslint:disable-next-line:interface-over-type-literal
export type Query = {
  getProviders: Provider[];
};
