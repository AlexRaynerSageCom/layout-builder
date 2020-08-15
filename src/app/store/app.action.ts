// ngrx
import { Action } from '@ngrx/store';

// Models
import { GridModel } from '../models';

////////////////////////////////////////////////////////////////////////////////
// Update Grid
////////////////////////////////////////////////////////////////////////////////

export const UPDATE_GRID = '[Builder] UPDATE_GRID';

export class UpdateGrid implements Action {
  readonly type = UPDATE_GRID;

  constructor(public grid: GridModel) {}
}

export type All =
  UpdateGrid;
