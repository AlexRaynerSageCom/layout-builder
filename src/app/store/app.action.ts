// ngrx
import { Action } from '@ngrx/store';

// Models
import { GridModel, GridItemModel } from '../models';

////////////////////////////////////////////////////////////////////////////////
// Update Grid
////////////////////////////////////////////////////////////////////////////////

export const UPDATE_GRID = '[Builder] UPDATE_GRID';

export class UpdateGrid implements Action {
  readonly type = UPDATE_GRID;

  constructor(public grid: GridModel) {}
}

////////////////////////////////////////////////////////////////////////////////
// Reset Grid
////////////////////////////////////////////////////////////////////////////////

export const RESET_GRID = '[Builder] RESET_GRID';

export class ResetGrid implements Action {
  readonly type = RESET_GRID;

  constructor(public grid: GridModel) {}
}

////////////////////////////////////////////////////////////////////////////////
// Add Grid Item
////////////////////////////////////////////////////////////////////////////////

export const ADD_GRID_ITEM = '[Builder] ADD_GRID_ITEM';

export class AddGridItem implements Action {
  readonly type = ADD_GRID_ITEM;

  constructor(public gridItem: GridItemModel) {}
}

export type All =
  UpdateGrid
  | ResetGrid
  | AddGridItem;
