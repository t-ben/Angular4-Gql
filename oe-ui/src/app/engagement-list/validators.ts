import { ValidatorFn, AbstractControl, FormArray, FormGroup } from '@angular/forms';

// validator to check that engagement dropdown on added engagement (id=-1) has a selection.
export function engagementRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return control.value === '-1' ? { 'engRequired': { value: control.value } } : null;
    };
}
