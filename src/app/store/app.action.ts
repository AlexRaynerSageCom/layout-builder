// ngrx
import { Action } from '@ngrx/store';

// Models
import { GridModel, AxisModel, AxisGapModel } from '../models';

////////////////////////////////////////////////////////////////////////////////
// Add Column
////////////////////////////////////////////////////////////////////////////////

export const ADD_COLUMN = '[Builder] ADD_COLUMN';

export class AddColumn implements Action {
  readonly type = ADD_COLUMN;
}

////////////////////////////////////////////////////////////////////////////////
// Add Row
////////////////////////////////////////////////////////////////////////////////

export const ADD_ROW = '[Builder] ADD_ROW';

export class AddRow implements Action {
  readonly type = ADD_ROW;
}

////////////////////////////////////////////////////////////////////////////////
// Update Column
////////////////////////////////////////////////////////////////////////////////

export const UPDATE_COLUMN = '[Builder] UPDATE_COLUMN';

export class UpdateColumn implements Action {
  readonly type = UPDATE_COLUMN;

  constructor(public index: number, public column: AxisModel) {}
}

////////////////////////////////////////////////////////////////////////////////
// Update Row
////////////////////////////////////////////////////////////////////////////////

export const UPDATE_ROW = '[Builder] UPDATE_ROW';

export class UpdateRow implements Action {
  readonly type = UPDATE_ROW;

  constructor(public index: number, public row: AxisModel) {}
}

////////////////////////////////////////////////////////////////////////////////
// Remove Column
////////////////////////////////////////////////////////////////////////////////

export const REMOVE_COLUMN = '[Builder] REMOVE_COLUMN';

export class RemoveColumn implements Action {
  readonly type = REMOVE_COLUMN;

  constructor(public index: number) {}
}

////////////////////////////////////////////////////////////////////////////////
// Remove Row
////////////////////////////////////////////////////////////////////////////////

export const REMOVE_ROW = '[Builder] REMOVE_ROW';

export class RemoveRow implements Action {
  readonly type = REMOVE_ROW;

  constructor(public index: number) {}
}

////////////////////////////////////////////////////////////////////////////////
// Update Column Gap
////////////////////////////////////////////////////////////////////////////////

export const UPDATE_COLUMN_GAP = '[Builder] UPDATE_COLUMN_GAP';

export class UpdateColumnGap implements Action {
  readonly type = UPDATE_COLUMN_GAP;

  constructor(public columnGap: AxisGapModel) {}
}

////////////////////////////////////////////////////////////////////////////////
// Update Row Gap
////////////////////////////////////////////////////////////////////////////////

export const UPDATE_ROW_GAP = '[Builder] UPDATE_ROW_GAP';

export class UpdateRowGap implements Action {
  readonly type = UPDATE_ROW_GAP;

  constructor(public rowGap: AxisGapModel) {}
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
// Create Grid Item
////////////////////////////////////////////////////////////////////////////////

export const CREATE_GRID_ITEM = '[Builder] CREATE_GRID_ITEM';

export class CreateGridItem implements Action {
  readonly type = CREATE_GRID_ITEM;

  constructor(public row: number, public column: number) {}
}

export type All =
  AddColumn
  | AddRow
  | UpdateColumn
  | UpdateRow
  | RemoveColumn
  | RemoveRow
  | UpdateColumnGap
  | UpdateRowGap
  | ResetGrid
  | CreateGridItem;
