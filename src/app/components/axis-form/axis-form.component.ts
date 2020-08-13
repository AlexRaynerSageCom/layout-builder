// Angular
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-axis-form',
  template: `
    <form
      *ngIf="axisForm"
      [formGroup]="axisForm"
      (ngSubmit)="addAxis()"
    >
      <div class="input-field">
        <sds-input-text
          formControlName="size"
          placeholderText="size.."
          errorType="error"
          [errors]="isFieldInvalid(axisForm, 'size')"
        >
        </sds-input-text>
      </div>

      <div class="input-field">
        <sds-dropdown
          formControlName="unit"
          placeholder="unit.."
          errorType="error"
          [errors]="isFieldInvalid(axisForm, 'unit')"
        >
          <sds-dropdown-option
            *ngFor="let option of axisUnits"
            [value]="option"
          >
            {{ option }}
          </sds-dropdown-option>
        </sds-dropdown>
      </div>

      <sds-button type="submit">Add</sds-button>
    </form>
  `,
  styleUrls: ['./axis-form.component.scss']
})
export class AxisFormComponent {
  @Input()
  axisForm: FormGroup;

  @Output()
  axisAdded: EventEmitter<void> = new EventEmitter<void>();

  axisUnits = [
    'fr',
    '%',
    'px',
    'auto'
  ];

  addAxis() {
    this.axisForm.markAllAsTouched();

    if (!this.axisForm.valid) {
      return;
    }

    this.axisAdded.emit();
  }

  isFieldInvalid(form: FormGroup, field: string): string {
    return form.get(field).touched && form.get(field).errors
      ? 'This field is required.'
      : null;
  }
}
