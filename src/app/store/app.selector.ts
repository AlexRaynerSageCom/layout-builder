// ngrx
import { createSelector } from '@ngrx/store';
import { AppState, BuilderState } from './app.state';
import { GridModel, AxisModel } from '../models';

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

export const selectGridStyle = createSelector(
  selectGrid,
  (grid: GridModel) => {
    return {
      display: 'grid',
      gridTemplateColumns: grid.columns.map(column => createAxisTemplateStyle(column)).join(' '),
      gridColumnGap: grid.columnGap + 'px',
      gridTemplateRows: grid.rows.map(row => createAxisTemplateStyle(row)).join(' '),
      gridRowGap: grid.rowGap + 'px'
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
