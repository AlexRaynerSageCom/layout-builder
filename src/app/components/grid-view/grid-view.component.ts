// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as BuilderSelectors from '../../store/app.selector';

// libs
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

// Models
import { GridModel, GridItemModel } from '../../models';
import { AddGridItem } from 'src/app/store/app.action';

@Component({
  selector: 'app-grid-view',
  template: `
    <div
      id="grid"
      class="grid"
      [style]="styles$ | async"
    >
      <div
        *ngFor="let itemStyle of itemStyles"
        [style]="itemStyle"
      ></div>

      <div
        *ngFor="let item of count; let i = index"
        class="grid__item"
        (click)="addItem(i)"
      >
        <sds-icon
          class="grid__item--add"
          iconType="plus"
        >
        </sds-icon>
      </div>
    </div>
  `,
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit, OnDestroy {
  grid: GridModel;

  styles$: Observable<{[key: string]: any}> =
   this.store.select(BuilderSelectors.selectGridStyle);

  itemStyles: {[key: string]: any}[];

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(BuilderSelectors.selectGrid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(grid => {
        this.grid = grid;
      });

    this.store.select(BuilderSelectors.selectGridItemStyles)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(gridItemStyles => {
        this.itemStyles = gridItemStyles;
      });
  }

  get count() {
    return new Array(
      this.grid.columns.length * Math.max(1, this.grid.rows.length) - this.itemStyles.length
    );
  }

  addItem(index: number) {
    const column = (index % this.grid.columns.length) + 1;
    const row = Math.floor(index / this.grid.columns.length) + 1;

    const item: GridItemModel = {
      columnStart: column,
      columnEnd: column + 1,
      rowStart: row,
      rowEnd: row + 1
    };

    this.store.dispatch(new AddGridItem(item));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
