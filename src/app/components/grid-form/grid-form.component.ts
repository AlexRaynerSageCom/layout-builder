// Angular
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-grid-form',
  template: `
    <form
      *ngIf="gridForm"
      [formGroup]="gridForm"
    >
      <div class="sub-heading">Columns:</div>

      <sds-button
        class="add-button"
        type="button"
        (clickEvent)="addColumn()"
      >
        Add
      </sds-button>
      <app-axis-form
        *ngFor="let axisForm of columnForms.controls; let i = index"
        [axisForm]="axisForm"
        (axisRemoved)="removeColumn(i)"
      >
      </app-axis-form>

      <div class="sub-heading">Rows:</div>
      <sds-button
        class="add-button"
        type="button"
        (clickEvent)="addRow()"
      >
        Add
      </sds-button>
      <app-axis-form
        *ngFor="let axisForm of rowForms.controls; let i = index"
        [axisForm]="axisForm"
        (axisRemoved)="removeRow(i)"
      >
      </app-axis-form>

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
    </form>
  `,
  styleUrls: ['./grid-form.component.scss']
})
export class GridFormComponent {
  @Input()
  gridForm: FormGroup;

  @Output()
  columnAdded: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  rowAdded: EventEmitter<void> = new EventEmitter<void>();

  get columnForms() {
    return this.gridForm.get('columns') as FormArray;
  }

  get rowForms() {
    return this.gridForm.get('rows') as FormArray;
  }

  addColumn() {
    this.columnAdded.emit();
  }

  addRow() {
    this.rowAdded.emit();
  }

  removeColumn(index: number) {
    const columnForms = this.gridForm.get('columns') as FormArray;

    columnForms.removeAt(index);
  }

  removeRow(index: number) {
    const rowForms = this.gridForm.get('rows') as FormArray;

    rowForms.removeAt(index);
  }
}
