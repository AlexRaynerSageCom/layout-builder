// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as BuilderSelectors from '../../store/app.selector';

// libs
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

// Models
import { GridModel, GridItemModel } from '../../models';
import { CreateGridItem } from '../../store/app.action';

@Component({
  selector: 'app-grid-view',
  template: `
    <div
      id="grid"
      class="grid"
      [style]="styles$ | async"
    >
      <div
        *ngFor="let item of items$ | async; let i = index"
        class="grid__item"
        [class.grid__item--generated]="item.generated"
        style="grid-area: {{item.rowStart}} / {{item.columnStart}} / {{item.rowEnd}} / {{item.columnEnd}}"
        (click)="item.generated && addItem(item.rowStart, item.columnStart)"
      >
        <ng-container *ngIf="!item.generated; else generated">
          item
        </ng-container>

        <ng-template #generated>
          <sds-icon
            class="add-icon"
            iconType="plus"
          ></sds-icon>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./grid-view.component.scss']
})
// TODO: add ability to delete items
export class GridViewComponent implements OnInit, OnDestroy {
  grid: GridModel;

  styles$: Observable<{[key: string]: any}> =
    this.store.select(BuilderSelectors.selectGridStyle);

  items$: Observable<GridItemModel[]> =
    this.store.select(BuilderSelectors.selectGridItems);

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(BuilderSelectors.selectGrid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(grid => {
        this.grid = grid;
      });
  }

  addItem(row: number, column: number) {
    this.store.dispatch(new CreateGridItem(row, column));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
