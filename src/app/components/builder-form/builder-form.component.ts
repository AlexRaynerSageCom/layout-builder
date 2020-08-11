import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { GridModel } from '../../models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-builder-form',
  template: `
    <form class="builder-form" [formGroup]="form">
      <button
        type="button"
        (click)="updateColumns(grid.columns + 1)"
      >
        Add Column
      </button>
      <button
        type="button"
        [disabled]="grid.columns === 0"
        (click)="updateColumns(grid.columns - 1)"
      >
        Remove Column
      </button>

      <button
        type="button"
        (click)="updateRows(grid.rows + 1)"
      >
        Add Row
      </button>
      <button
        type="button"
        [disabled]="grid.rows === 0"
        (click)="updateRows(grid.rows - 1)"
      >
        Remove Row
      </button>

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
  styleUrls: ['./builder-form.component.scss']
})
export class BuilderFormComponent implements OnInit {
  @Input() grid: GridModel;

  @Output()
  gridChanged: EventEmitter<GridModel> = new EventEmitter<GridModel>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      columnGap: this.grid.columnGap,
      rowGap: this.grid.rowGap
    });

    this.form.get('columnGap').valueChanges.subscribe(value => {
      const newGrid = { ...this.grid, ...{ columnGap: value} };
      this.gridChanged.emit(newGrid);
    });

    this.form.get('rowGap').valueChanges.subscribe(value => {
      const newGrid = { ...this.grid, ...{ rowGap: value} };
      this.gridChanged.emit(newGrid);
    });
  }

  updateColumns(value: number) {
    const newGrid = { ...this.grid, ...{ columns: value} };

    this.gridChanged.emit(newGrid);
  }

  updateRows(value: number) {
    const newGrid = { ...this.grid, ...{ rows: value} };

    this.gridChanged.emit(newGrid);
  }
}
