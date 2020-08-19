// ngrx
import { createSelector } from '@ngrx/store';
import { AppState, BuilderState } from './app.state';
import { GridModel, AxisModel, GridItemModel } from '../models';

export const selectBuilder = (state: AppState) => state.app;

export const selectGrid = createSelector(
  selectBuilder,
  (state: BuilderState) => state.grid
);

export const selectGridItems = createSelector(
  selectGrid,
  (grid: GridModel) => grid.items
);

const createAxisTemplateStyle = (axis: AxisModel) => {
  switch (axis.unit) {
    case 'auto':
    case 'min-content':
    case 'max-content': {
      return `${axis.unit}`;
    }

    case 'minmax': {
      return `${axis.unit}(${axis.size})`;
    }

    default: {
      return `${axis.size}${axis.unit}`;
    }
  }
};

export const selectGridStyle = createSelector(
  selectGrid,
  (grid: GridModel) => {
    return {
      display: 'grid',
      ...(grid.columns.length > 0
        ? {gridTemplateColumns: grid.columns.map(column => createAxisTemplateStyle(column)).join(' ')}
        : {}),
      ...(grid.columnGap.size > 0
        ? {gridColumnGap: `${grid.columnGap.size}${grid.columnGap.unit}`}
        : {}),
      ...(grid.rows.length > 0
        ? {gridTemplateRows: grid.rows.map(row => createAxisTemplateStyle(row)).join(' ')}
        : {}),
      ...(grid.rowGap.size > 0
        ? {gridRowGap: `${grid.rowGap.size}${grid.rowGap.unit}`}
        : {})
    };
  }
);

export const selectHTML = createSelector(
  selectGrid,
  selectGridItems,
  (grid: GridModel, items: GridItemModel[]) => {
    let html = `<div class="grid-container">`;

    items.filter(item => !item.generated)
      .forEach((item, index) => {
        html += `\n  <div class="item-${index}"></div>`;
      });

    return html += `\n</div>`;
  }
);

export const selectGridItemStyles = createSelector(
  selectGridItems,
  (gridItems: GridItemModel[]) => {
    return gridItems.filter(item => !item.generated)
      .map(item => {
        return {
          gridArea: `${item.rowStart} / ${item.columnStart} / ${item.rowEnd} / ${item.columnEnd}`
        };
      });
  }
);
