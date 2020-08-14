// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as BuilderSelectors from '../../store/app.selector';
import { DeleteColumn, DeleteRow } from 'src/app/store/app.action';

// libs
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// Components
import { EditAxisDialogComponent } from '../edit-axis-dialog/edit-axis-dialog.component';

// Models
import { GridModel } from '../../models';
import { DialogService } from '@sage/ng-carbon/dialog';

@Component({
  selector: 'app-grid-view',
  template: `
    <div class="grid-view">
      <div
        *ngIf="grid.columns.length > 0"
        class="columns"
        [style]="columnStyles"
      >
        <div
          *ngFor="let col of columnCount; let i = index"
          tabIndex="0"
          (click)="editAxis(i, 'column')"
        >
          EDIT
        </div>
      </div>

      <div
        *ngIf="grid.rows.length > 0"
        class="rows"
        [style]="rowStyles"
      >
        <div
          *ngFor="let row of rowCount; let i = index"
          tabIndex="0"
          (click)="editAxis(i, 'row')"
        >
          EDIT
        </div>
      </div>

      <div
        id="grid"
        class="grid"
        [style]="styles"
      >
        <ng-container *ngIf="grid?.fillGrid">
          <div
            *ngFor="let item of count"
            class="grid__item"
          >
            ITEM
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit, OnDestroy {
  grid: GridModel;

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private dialogService: DialogService) {}

  ngOnInit() {
    this.store.select(BuilderSelectors.selectGrid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(grid => {
        this.grid = grid;
      });
  }

  editAxis(index: number, axisType: 'column' | 'row') {
    this.dialogService.open(EditAxisDialogComponent, {
      size: 'medium-small',
      showCloseIcon: true,
      data: {
        axis: this.grid[`${axisType}s`][index],
        axisType,
        position: index
      }
    }).onClosed.subscribe(result => {
      if (result === 'Delete') {
        if (axisType === 'column') {
          this.removeColumn(index);
        } else {
          this.removeRow(index);
        }
      }
    });
  }

  removeColumn(index: number) {
    this.store.dispatch(new DeleteColumn(index));
  }

  removeRow(index: number) {
    this.store.dispatch(new DeleteRow(index));
  }

  get columnCount() {
    return new Array(this.grid.columns.length);
  }

  get rowCount() {
    return new Array(this.grid.rows.length);
  }

  get count() {
    return new Array(this.grid.columns.length * Math.max(1, this.grid.rows.length));
  }

  get columnStyles() {
    return {
      gridTemplateColumns: this.grid.columns.map(column => `${column.size}${column.unit}`).join(' '),
      gridColumnGap: this.grid.columnGap + 'px'
    };
  }

  get rowStyles() {
    return {
      gridTemplateRows: this.grid.rows.map(row => `${row.size}${row.unit}`).join(' '),
      gridRowGap: this.grid.rowGap + 'px'
    };
  }

  get styles() {
    return {
      display: 'grid',
      ...this.columnStyles,
      ...this.rowStyles
    };
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
