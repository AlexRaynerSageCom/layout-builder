import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridModel, AxisModel } from '../models';

@Injectable()
export class FormsService {

  constructor(private formBuilder: FormBuilder) {}

  createGridForm(grid: GridModel): FormGroup {
    return this.formBuilder.group({
      columnGap: this.formBuilder.group({
        size: grid.columnGap.size,
        unit: grid.columnGap.unit
      }),
      rowGap: this.formBuilder.group({
        size: grid.rowGap.size,
        unit: grid.rowGap.unit
      }),
      columns: this.formBuilder.array([
        ...grid.columns.map(column => this.createAxisForm(column))
      ]),
      rows: this.formBuilder.array([
        ...grid.rows.map(row => this.createAxisForm(row))
      ])
    });
  }

  createAxisForm(axis?: AxisModel): FormGroup {
    return this.formBuilder.group({
      size: [ axis?.size ?? '', Validators.required],
      unit: [ axis?.unit ?? null, Validators.required]
    });
  }

}
