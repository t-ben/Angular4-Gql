import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Provider, EngagementConfigData, EngagementConfigView, OEConstants, Engagement, ProviderInput } from '../provider-list/types';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'engagement-list',
  templateUrl: './engagement.list.component.html'
})
export class EngagementList implements OnInit {
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  @Input() engagements: [Engagement];
  @Input() provider: Provider;
  @Input() saveProviderConfig: Function;

  engagementConfigsView: EngagementConfigView[];
  validationErrors: any = [];

  // reactive:
  providerConfigForm: FormGroup;
  get capacity() { return this.providerConfigForm.get('capacity'); }

  validateCapacityEngagements(): boolean {
    // custom error that errors if capacity > 0 and no engagements configs
    if (this.capacity.value) {
      if (this.capacity.value > 0 && this.engagementConfigs.length === 0) {
        const errors = this.capacity.errors;
        this.capacity.setErrors({ ...errors, capacityEng: 'Capacity custom' });
        return true;
      } else {
        const errors = this.capacity.errors;
        if (errors && errors.capacityEng) {
          delete errors.capacityEng;
          if (Object.keys(errors).length === 0) {
            // no other errors: set null will also turn status to valid
            this.capacity.setErrors(null);
          } else {
            // keep other errors and stay invalid:
            this.capacity.setErrors(errors);
          }
        }
        return false;
      }
    }
    return null;
  }
  showFieldErrors(field, validateCapacityEngagements): boolean {
    const triggered = (this.providerConfigForm.dirty || this.providerConfigForm.touched);
    let customError = null;
    if (validateCapacityEngagements && triggered) {
      customError = this.validateCapacityEngagements();
      if (customError) {
        return true;
      }
    }
    return field.invalid && (field.dirty || field.touched || triggered);
  }
  getFieldError(errors, label): string {
    // note: only returning and showing one error for now.
    let result = '';
    if (errors) {
      if (errors.required || errors.engRequired) {
        result += `${label} is required. `;
      }
      if (errors.min) {
        result += `${label} must be at least ${errors.min.min}. `;
      }
      if (errors.max) {
        result += `${label} cannot be greater then ${errors.max.max}. `;
      }
      if (errors.capacityEng) {
        result += 'Capacity requires engagements. ';
      }
    }
    return result;
  }
  createForm() {
    this.providerConfigForm = this.fb.group({
      capacity: ['', // value binding will be assigned in onInit createForm
        [Validators.required,
        // Validators.pattern(OEConstants.WHOLE_NUMBER_REGEX), // not needed if html type is number
        Validators.min(0),
        Validators.max(100)]],
      engagementConfigs: this.fb.array([]),
    });
  }
  transformDataToViewModel(engagementConfigs: EngagementConfigData[]): EngagementConfigView[] {
    const engConfigsViewModel = this.provider.engagements.map(engConfig => {

      const engConfigView = new EngagementConfigView(engConfig);
      engConfigView.init(this.engagements);
      return engConfigView;
    });
    return engConfigsViewModel;
  }

  setViewModelToForm(engConfigsView: EngagementConfigView[]) {
    const engagementFGs = engConfigsView.map(engConfig => this.fb.group(engConfig));
    const engFormArray = this.fb.array(engagementFGs);
    this.providerConfigForm.setControl('engagementConfigs', engFormArray); // engagementConfigs = the formArrayName on template
  }
  get engagementConfigs(): FormArray {
    return this.providerConfigForm.get('engagementConfigs') as FormArray;
  }

  ngOnInit(): void {
    this.engagementConfigsView = this.transformDataToViewModel(this.provider.engagements);
    this.setViewModelToForm(this.engagementConfigsView);
    this.providerConfigForm.patchValue( {
      capacity: this.provider.capacity,
    });
  }
  addEngagement(): void {
    const newEngData = new EngagementConfigData();
    const newEngConfigView = new EngagementConfigView(newEngData);
    this.engagementConfigs.push(this.fb.group(newEngConfigView));
    this.validateCapacityEngagements();
  }
  removeEngagement(index): void {
    this.engagementConfigs.removeAt(index);
    this.validateCapacityEngagements();
    this.providerConfigForm.markAsDirty();  // when only removing save should get enabled
  }

  showEngagementDropdown(index): boolean {
    const engConfig: FormGroup = <FormGroup>this.engagementConfigs.controls[index];
    const status = engConfig.get('status').value;
    const isNew = engConfig.get('isNew').value;
    if (status !== 'Active' && !isNew) {
      return false;
    }
    return true;
  }
  isSelect(engId, currentEngConfigId): boolean {
    if (engId === currentEngConfigId) {
      return true;
    } else {
      const options = this.getDropdownOptions(currentEngConfigId);
      if (options.length === 1) {
        // automatically select the last option
        const engConfig: FormGroup = this.findEngConfigControl(currentEngConfigId);
        setTimeout(() => engConfig.patchValue({ id: engId }), 0);
        return true;
      }
    }
    return false;
  }
  canAddEngagement(): boolean {
    const unselectedEngagements = this.engagements.filter(e => {
      const alreadyUsed = !!this.findEngConfigControl(e.id);
      return e.isActive && !alreadyUsed;
    });
    const engConfigs: FormGroup[] = <FormGroup[]>this.engagementConfigs.controls;
    const unconfigured = engConfigs.filter(engConfigControl => engConfigControl.get('id').value === '-1');
    const leftToAdd = unselectedEngagements.length - unconfigured.length;
    return (leftToAdd > 0);
  }
  getDropdownOptions(currentEngConfigId): Engagement[] {
    const result = this.engagements.filter(e => {
      const alreadyUsed = (currentEngConfigId !== e.id) && !!this.findEngConfigControl(e.id);
      return e.isActive && !alreadyUsed;
    });
    return result;
  }
  showSelectOneOption(id): boolean {
    if (id === '-1') {
      return true;
    }
    return false;
  }
  findEngConfigControl(engId): FormGroup {
    const engConfigs: FormGroup[] = <FormGroup[]>this.engagementConfigs.controls;
    const engConfig = engConfigs.find(engConfigControl => engConfigControl.get('id').value === engId);
    return engConfig;
  }
  transformViewModelToData(engConfigViews: any[]): EngagementConfigData[] {
    const engConfigsData = engConfigViews.map(e => {
      const data = new EngagementConfigData();
      data.id = e.id;
      data.incentive = e.incentive;
      data.cost = e.cost;
      // add engagement name to each engagaement config (could be edited)
      const engagement = this.engagements.find((eng) => eng.id === e.id);
      if (engagement) {
        data.name = engagement.name;
      } else {
        data.name = e.name; // engagement id not found so we keep the existing name as it is in the db (Not Available status)
      }
      return data;
    });
    return engConfigsData;
  }
  canSave(): boolean {
    return this.providerConfigForm.valid && this.providerConfigForm.dirty;
  }
  saveProvider(): void {
    if (this.providerConfigForm.dirty && this.providerConfigForm.valid) {
      //form value to ProviderInput (make type)
      const formValue = this.providerConfigForm.value;
      const dataToSave = <ProviderInput>{
        engagements: this.transformViewModelToData(formValue.engagementConfigs),
        capacity: formValue.capacity,
        providerId: this.provider.id,
      };
      // SAVE IT
      this.saveProviderConfig(dataToSave);
    }
  }
  cancelProviderConfig(): void {
    const engagementConfigsView = this.transformDataToViewModel(this.provider.engagements);
    this.setViewModelToForm(engagementConfigsView);

    this.providerConfigForm.patchValue( {
      capacity: this.provider.capacity,
    });
    this.providerConfigForm.markAsPristine();
  }
}
