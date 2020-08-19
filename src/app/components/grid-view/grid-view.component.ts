// Angular
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as BuilderSelectors from '../../store/app.selector';

// libs
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

// Models
import { GridModel, GridItemModel } from '../../models';
import { CreateGridItem, RemoveGridItem } from '../../store/app.action';

@Component({
  selector: 'app-grid-view',
  template: `
    <div
      id="grid"
      class="grid"
      [style]="styles$ | async"
    >
      <div
        class="grid__item--generated hover-cell"
        [style]="hoverStyles"
      ></div>

      <div
        *ngFor="let item of items$ | async; let i = index"
        class="grid__item"
        [class.grid__item--generated]="item.generated"
        style="grid-area: {{item.rowStart}} / {{item.columnStart}} / {{item.rowEnd}} / {{item.columnEnd}}"
        (mousedown)="item.generated && start(item)"
        (mouseenter)="item.generated && hover(item)"
        (mouseup)="item.generated && end()"
        (click)="!item.generated && removeItem(item)"
      >
        <sds-icon
          class="icon"
          [type]="item.generated ? 'none' : 'error'"
          [iconType]="item.generated ? 'plus' : 'close'"
        ></sds-icon>
      </div>
    </div>
  `,
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit, OnDestroy {
  @ViewChild('selection') selection: ElementRef;

  grid: GridModel;

  styles$: Observable<{[key: string]: any}> =
    this.store.select(BuilderSelectors.selectGridStyle);

  items$: Observable<GridItemModel[]> =
    this.store.select(BuilderSelectors.selectGridItems);

  mouseHeld = false;
  startGridItem: GridItemModel;
  currentGridItem: GridItemModel;
  hoverStyles: {[key: string]: string};

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(BuilderSelectors.selectGrid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(grid => {
        this.grid = grid;
      });
  }

  removeItem(item: GridItemModel) {
    this.store.dispatch(new RemoveGridItem(item));
  }

  start(item: GridItemModel) {
    this.mouseHeld = true;
    this.startGridItem = item;
    this.currentGridItem = item;

    this.getHoverStyles();
  }

  hover(item: GridItemModel) {
    if (!this.mouseHeld) {
      return;
    }

    this.currentGridItem = item;
    this.getHoverStyles();
  }

  end() {
    const item = this.getHoverGrid();

    this.mouseHeld = false;
    this.hoverStyles = {};

    this.store.dispatch(new CreateGridItem({
      ...item,
      generated: false
    }));
  }

  getHoverStyles() {
    const item = this.getHoverGrid();

    this.hoverStyles = {
      gridArea: `${item.rowStart} / ${item.columnStart} / ${item.rowEnd} / ${item.columnEnd}`,
      display: 'block'
    };
  }

  getHoverGrid(): GridItemModel {
    const item: GridItemModel = {
      ...(this.currentGridItem.rowStart >= this.startGridItem.rowStart
        ? {rowStart: this.startGridItem.rowStart, rowEnd: this.currentGridItem.rowEnd}
        : {rowStart: this.currentGridItem.rowStart, rowEnd: this.startGridItem.rowEnd}),
      ...(this.currentGridItem.columnStart >= this.startGridItem.columnStart
        ? {columnStart: this.startGridItem.columnStart, columnEnd: this.currentGridItem.columnEnd}
        : {columnStart: this.currentGridItem.columnStart, columnEnd: this.startGridItem.columnEnd}),
      generated: false
    };

    return item;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
