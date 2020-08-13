// Angular
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-grid-form',
  template: `
    <form
      *ngIf="gridForm"
      [formGroup]="gridForm"
    >
      <div class="input-field">
        <label>
          Column Gap (px):
          <input type="number" min="0" formControlName="columnGap"/>
        </label>
      </div>

      <div class="input-field">
        <label>
          Row Gap (px):
          <input type="number" min="0" formControlName="rowGap"/>
        </label>
      </div>

      <div class="input-field">
        <sds-checkbox
          formControlName="fillGrid"
          size="large"
        >
          Fill grid?
        </sds-checkbox>
      </div>
    </form>
  `,
  styleUrls: ['./grid-form.component.scss']
})
export class GridFormComponent {
  @Input()
  gridForm: FormGroup;
}
