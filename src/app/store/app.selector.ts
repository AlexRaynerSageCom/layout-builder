// ngrx
import { createSelector } from '@ngrx/store';
import { AppState, BuilderState } from './app.state';

export const selectBuilder = (state: AppState) => state.app;

export const selectGrid = createSelector(
  selectBuilder,
  (state: BuilderState) => state.grid
);
