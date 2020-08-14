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
import { GridModel } from '../../models';

@Component({
  selector: 'app-grid-view',
  template: `
    <div
      id="grid"
      class="grid"
      [style]="styles$ | async"
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
  `,
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit, OnDestroy {
  grid: GridModel;

  styles$: Observable<{[key: string]: any}> =
   this.store.select(BuilderSelectors.selectGridStyle);

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(BuilderSelectors.selectGrid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(grid => {
        this.grid = grid;
      });
  }

  get count() {
    return new Array(this.grid.columns.length * Math.max(1, this.grid.rows.length));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
