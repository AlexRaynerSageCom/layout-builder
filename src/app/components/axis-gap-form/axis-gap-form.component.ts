// Angular
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Models
import { GapUnits } from '../../models';

@Component({
  selector: 'app-axis-gap-form',
  template: `
    <form
      *ngIf="axisGapForm"
      class="axis-gap-form"
      [formGroup]="axisGapForm"
    >
      <input
        [class.input-error]="isFieldInvalid(axisGapForm, 'size')"
        type="number"
        placeholder="size"
        min="0"
        formControlName="size"
      />

      <sds-dropdown
        formControlName="unit"
        placeholder="unit"
      >
        <sds-dropdown-option
          *ngFor="let option of gapOptions"
          [value]="option"
        >
          {{ option }}
        </sds-dropdown-option>
      </sds-dropdown>
    </form>
  `,
  styleUrls: ['./axis-gap-form.component.scss']
})
export class AxisGapFormComponent {
  @Input()
  axisGapForm: FormGroup;

  gapOptions = GapUnits;

  isFieldInvalid(form: FormGroup, field: string): string {
    return form.get(field).touched && form.get(field).errors
      ? 'This field is required.'
      : null;
  }
}
