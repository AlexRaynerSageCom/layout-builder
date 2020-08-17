// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

// Services
import { FormsService } from '../../services';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as BuilderSelectors from '../../store/app.selector';
import {
  RemoveColumn,
  RemoveRow,
  AddColumn,
  AddRow,
  ResetGrid,
  UpdateColumn,
  UpdateRow,
  UpdateColumnGap,
  UpdateRowGap
} from '../../store/app.action';

// Libs
import { take } from 'rxjs/operators';

// Models
import { GridModel, getInitialGrid, AxisModel } from '../../models';

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
        (axisChanged)="updateColumn(i, $event)"
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
        (axisChanged)="updateRow(i, $event)"
      >
      </app-axis-form>

      <div class="sub-heading">Column Gap:</div>
      <app-axis-gap-form [axisGapForm]="gridForm.get('columnGap')">
      </app-axis-gap-form>

      <div class="sub-heading">Row Gap:</div>
      <app-axis-gap-form [axisGapForm]="gridForm.get('rowGap')">
      </app-axis-gap-form>

      <sds-button (clickEvent)="resetForm()">
        Reset
      </sds-button>
    </form>
  `,
  styleUrls: ['./grid-form.component.scss']
})
export class GridFormComponent implements OnInit {
  gridForm: FormGroup;

  constructor(
    private formsService: FormsService,
    private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(BuilderSelectors.selectGrid)
      .pipe(take(1))
      .subscribe(grid => this.createGridForm(grid));
  }

  createGridForm(grid: GridModel) {
    this.gridForm = this.formsService.createGridForm(grid);

    this.gridForm.get('columnGap').valueChanges.subscribe(value => {
      this.store.dispatch(new UpdateColumnGap(value));
    });

    this.gridForm.get('rowGap').valueChanges.subscribe(value => {
      this.store.dispatch(new UpdateRowGap(value));
    });
  }

  get columnForms() {
    return this.gridForm.get('columns') as FormArray;
  }

  get rowForms() {
    return this.gridForm.get('rows') as FormArray;
  }

  addColumn() {
    const columnForms = this.gridForm.get('columns') as FormArray;

    columnForms.push(this.formsService.createAxisForm(
      { size: '1', unit: 'fr' }
    ));
    this.store.dispatch(new AddColumn());
  }

  addRow() {
    const rowForms = this.gridForm.get('rows') as FormArray;

    rowForms.push(this.formsService.createAxisForm(
      { size: '1', unit: 'fr' }
    ));
    this.store.dispatch(new AddRow());
  }

  updateColumn(index: number, column: AxisModel) {
    this.store.dispatch(new UpdateColumn(index, column));
  }

  updateRow(index: number, row: AxisModel) {
    this.store.dispatch(new UpdateRow(index, row));
  }

  removeColumn(index: number) {
    const columnForms = this.gridForm.get('columns') as FormArray;

    if (columnForms.length > 1) {
      columnForms.removeAt(index);
      this.store.dispatch(new RemoveColumn(index));
    }
  }

  removeRow(index: number) {
    const rowForms = this.gridForm.get('rows') as FormArray;

    if (rowForms.length > 1) {
      rowForms.removeAt(index);
      this.store.dispatch(new RemoveRow(index));
    }
  }

  resetForm() {
    const defaultGrid = getInitialGrid();

    this.store.dispatch(new ResetGrid(defaultGrid));
    this.createGridForm(defaultGrid);
  }

}
