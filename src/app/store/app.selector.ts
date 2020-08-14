// ngrx
import { createSelector } from '@ngrx/store';
import { AppState, BuilderState } from './app.state';
import { GridModel } from '../models';

export const selectBuilder = (state: AppState) => state.app;

export const selectGrid = createSelector(
  selectBuilder,
  (state: BuilderState) => state.grid
);

export const selectGridStyle = createSelector(
  selectGrid,
  (grid: GridModel) => {
    return {
      display: 'grid',
      gridTemplateColumns: grid.columns.map(column => `${column.size}${column.unit}`).join(' '),
      gridColumnGap: grid.columnGap + 'px',
      gridTemplateRows: grid.rows.map(row => `${row.size}${row.unit}`).join(' '),
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
