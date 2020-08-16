// ngrx
import { createSelector } from '@ngrx/store';
import { AppState, BuilderState } from './app.state';
import { GridModel, AxisModel, GridItemModel } from '../models';

export const selectBuilder = (state: AppState) => state.app;

export const selectGrid = createSelector(
  selectBuilder,
  (state: BuilderState) => state.grid
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

// TODO: make this a service/utils of some type
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
  (grid: GridModel) => {
    return `<div class="grid-container">
</div>`;
  }
);

export const selectGridItems = createSelector(
  selectGrid,
  (grid: GridModel) => grid.items
);

export const selectGridItemStyles = createSelector(
  selectGridItems,
  (gridItems: GridItemModel[]) => {
    return gridItems.map(item => {
      return {
        gridArea: `${item.rowStart} / ${item.columnStart} / ${item.rowEnd} / ${item.columnEnd}`
      };
    });
  }
);
