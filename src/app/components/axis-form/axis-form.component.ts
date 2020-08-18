// Angular
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Models
import { Units, AxisModel } from '../../models';

@Component({
  selector: 'app-axis-form',
  template: `
    <form
      *ngIf="axisForm"
      class="axis-form"
      [formGroup]="axisForm"
    >
      <ng-container *ngIf="showSizeInput">
        <sds-input-text
          *ngIf="axisForm.get('unit').value === 'minmax'; else numberInput"
          class="axis-form__size"
          formControlName="size"
          placeholderText="min, max"
          errorType="error"
          size="small"
          [errors]="isFieldInvalid(axisForm, 'size')"
        >
        </sds-input-text>

        <ng-template #numberInput>
          <input
            class="axis-form__size input--small"
            [class.input-error]="isFieldInvalid(axisForm, 'size')"
            type="number"
            placeholder="size"
            min="0"
            formControlName="size"
          />
        </ng-template>
      </ng-container>

      <sds-dropdown
        class="axis-form__unit"
        [class.axis-form__unit--stretch]="!showSizeInput"
        formControlName="unit"
        placeholder="unit"
        errorType="error"
        size="small"
        [errors]="isFieldInvalid(axisForm, 'unit')"
      >
        <sds-dropdown-option
          *ngFor="let option of axisUnits"
          [value]="option"
        >
          {{ option }}
        </sds-dropdown-option>
      </sds-dropdown>

      <sds-button
        class="axis-form__delete"
        buttonType="tertiary"
        size="small"
        [destructive]="true"
        (clickEvent)="remove()"
      >
        <sds-icon iconType="close"></sds-icon>
      </sds-button>
    </form>
  `,
  styleUrls: ['./axis-form.component.scss']
})
// TODO: need to set a default minmax when selected
export class AxisFormComponent implements OnInit {
  @Input()
  axisForm: FormGroup;

  @Output()
  axisChanged: EventEmitter<AxisModel> = new EventEmitter<AxisModel>();

  @Output()
  axisRemoved: EventEmitter<void> = new EventEmitter<void>();

  axisUnits = Units;

  unitsWithNoSize = ['auto', 'min-content', 'max-content'];

  ngOnInit() {
    this.axisForm.valueChanges.subscribe(value => {
      this.axisChanged.emit(value);
    });

    this.axisForm.get('unit').valueChanges.subscribe(value => {
      // do nothing if there is no size associated to unit
      if (this.unitsWithNoSize.includes(value)) {
        return;
      }

      let sizeValue: string;

      switch (value) {
        case 'fr':
        default:
          sizeValue = '1';
          break;
        case '%':
        case 'em':
          sizeValue = '10';
          break;
        case 'px':
          sizeValue = '300';
          break;
        case 'minmax':
          sizeValue = '50px, 100px';
          break;
      }

      this.axisForm.get('size').patchValue(sizeValue, {emitEvent: false});
    });
  }

  get showSizeInput() {
    return !this.unitsWithNoSize.includes(
      this.axisForm.get('unit').value
    );
  }

  remove() {
    this.axisRemoved.emit();
  }

  isFieldInvalid(form: FormGroup, field: string): string {
    return form.get(field).touched && form.get(field).errors
      ? 'This field is required.'
      : null;
  }
}
