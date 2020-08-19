// Angular
import { Component, Input, OnInit } from '@angular/core';
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
        class="input--small"
        [class.input-error]="isFieldInvalid(axisGapForm, 'size')"
        type="number"
        placeholder="size"
        min="0"
        formControlName="size"
      />

      <sds-dropdown
        formControlName="unit"
        placeholder="unit"
        size="small"
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
export class AxisGapFormComponent implements OnInit {
  @Input()
  axisGapForm: FormGroup;

  gapOptions = GapUnits;

  ngOnInit() {
    this.axisGapForm.get('unit').valueChanges.subscribe(value => {
      let sizeValue: string;

      switch (value) {
        case '%':
        case 'em':
          sizeValue = '1';
          break;
        case 'px':
          sizeValue = '10';
          break;
      }

      this.axisGapForm.get('size').patchValue(sizeValue, {emitEvent: false});
    });
  }

  isFieldInvalid(form: FormGroup, field: string): string {
    return form.get(field).touched && form.get(field).errors
      ? 'This field is required.'
      : null;
  }
}
