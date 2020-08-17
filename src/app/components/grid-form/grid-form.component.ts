// Angular
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { GapUnits } from '../../models';

@Component({
  selector: 'app-grid-form',
  template: `
    <form
      *ngIf="gridForm"
      [formGroup]="gridForm"
    >
      <div class="sub-heading">Grid Columns:</div>

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

      <div class="sub-heading">Grid Rows:</div>
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

      <div class="sub-heading">Column Gap:</div>
      <app-axis-gap-form [axisGapForm]="gridForm.get('columnGap')">
      </app-axis-gap-form>

      <div class="sub-heading">Row Gap:</div>
      <app-axis-gap-form [axisGapForm]="gridForm.get('rowGap')">
      </app-axis-gap-form>
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
  columnRemoved: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  rowAdded: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  rowRemoved: EventEmitter<number> = new EventEmitter<number>();

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

    if (columnForms.length > 1) {
      columnForms.removeAt(index);
      this.columnRemoved.emit(index);
    }
  }

  removeRow(index: number) {
    const rowForms = this.gridForm.get('rows') as FormArray;

    if (rowForms.length > 1) {
      rowForms.removeAt(index);
      this.rowRemoved.emit(index);
    }
  }
}
