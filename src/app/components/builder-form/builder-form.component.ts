import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { GridModel } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-builder-form',
  template: `
    <form class="builder-form" [formGroup]="form">
      <sds-button
        type="button"
        (clickEvent)="showColumnForm = true"
      >
        Add Column
      </sds-button>

      <sds-button
        type="button"
        (clickEvent)="showRowForm = true"
      >
        Add Row
      </sds-button>

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

      <sds-checkbox
        formControlName="fillGrid"
        size="large"
      >
        Fill grid?
      </sds-checkbox>
    </form>

    <form
      *ngIf="showColumnForm"
      [formGroup]="columnForm"
      (ngSubmit)="addColumn()"
    >
      <div class="input-field">
        <label>
          New Column:
          <sds-input-text
            formControlName="size"
            placeholderText="size.."
            errorType="error"
            [errors]="isFieldInvalid(columnForm, 'size')"
          >
          </sds-input-text>
          <sds-dropdown
            formControlName="unit"
            placeholder="unit.."
            errorType="error"
            [errors]="isFieldInvalid(columnForm, 'unit')"
          >
            <sds-dropdown-option
              *ngFor="let option of axisUnits"
              [value]="option"
            >
              {{ option }}
            </sds-dropdown-option>
          </sds-dropdown>
        </label>
      </div>

      <sds-button type="submit">Add</sds-button>
    </form>

    <form
      *ngIf="showRowForm"
      [formGroup]="rowForm"
      (ngSubmit)="addRow()"
    >
      <div class="input-field">
        <label>
          New Row:
          <sds-input-text
            formControlName="size"
            placeholderText="size.."
            errorType="error"
            [errors]="isFieldInvalid(rowForm, 'size')"
          >
          </sds-input-text>
          <sds-dropdown
            formControlName="unit"
            placeholder="unit.."
            errorType="error"
            [errors]="isFieldInvalid(rowForm, 'unit')"
          >
            <sds-dropdown-option
              *ngFor="let option of axisUnits"
              [value]="option"
            >
              {{ option }}
            </sds-dropdown-option>
          </sds-dropdown>
        </label>
      </div>

      <sds-button type="submit">Add</sds-button>
    </form>
  `,
  styleUrls: ['./builder-form.component.scss']
})
export class BuilderFormComponent implements OnInit {
  @Input() grid: GridModel;

  @Output()
  gridChanged: EventEmitter<GridModel> = new EventEmitter<GridModel>();

  form: FormGroup;
  showColumnForm = false;
  columnForm: FormGroup;
  showRowForm = false;
  rowForm: FormGroup;

  axisUnits = [
    'fr',
    '%',
    'px',
    'auto'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      columnGap: this.grid.columnGap,
      rowGap: this.grid.rowGap,
      fillGrid: this.grid.fillGrid
    });

    this.columnForm = this.fb.group({
      size: ['', Validators.required],
      unit: [null, Validators.required]
    });

    this.rowForm = this.fb.group({
      size: ['', Validators.required],
      unit: [null, Validators.required]
    });

    this.form.valueChanges.subscribe(value => {
      const newGrid = { ...this.grid, ...value };
      this.gridChanged.emit(newGrid);
      console.log(newGrid);
    });
  }

  isFieldInvalid(form: FormGroup, field: string): string {
    return form.get(field).touched && form.get(field).errors
      ? 'This field is required.'
      : null;
  }

  addColumn() {
    this.columnForm.markAllAsTouched();

    if (!this.columnForm.valid) {
      return;
    }

    const newColumn = {
      size: this.columnForm.get('size').value,
      unit: this.columnForm.get('unit').value
    };

    const newGrid = {
      ...this.grid,
      ...{
        columns: [
          ...this.grid.columns,
          newColumn
        ]
      }
    };

    this.gridChanged.emit(newGrid);
    this.columnForm.reset();
    this.showColumnForm = false;
  }

  addRow() {
    this.rowForm.markAllAsTouched();

    if (!this.rowForm.valid) {
      return;
    }

    const newRow = {
      size: this.rowForm.get('size').value,
      unit: this.rowForm.get('unit').value
    };

    const newGrid = {
      ...this.grid,
      ...{
        rows: [
          ...this.grid.rows,
          newRow
        ]
      }
    };

    this.gridChanged.emit(newGrid);
    this.rowForm.reset();
    this.showRowForm = false;
  }
}
