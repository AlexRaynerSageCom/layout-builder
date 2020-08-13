// ngrx
import { ActionReducerMap } from '@ngrx/store';
import * as BuilderActions from './app.action';

// Models
import { AppState, BuilderState } from './app.state';
import { getInitialGrid } from '../models';

const defaultBuilderState: BuilderState = {
  grid: getInitialGrid()
};

export function builderReducer(state: BuilderState = defaultBuilderState, action: BuilderActions.All): BuilderState {

  switch (action.type) {
    ////////////////////////////////////////////////////////////////////////////////
    // Update Grid
    ////////////////////////////////////////////////////////////////////////////////

    case BuilderActions.UPDATE_GRID: {
      return {
        ...state,
        grid: {
          ...state.grid,
          ...action.grid
        }
      };
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Add Column
    ////////////////////////////////////////////////////////////////////////////////

    case BuilderActions.ADD_COLUMN: {
      return {
        ...state,
        grid: {
          ...state.grid,
          columns: [
            ...state.grid.columns,
            action.column
          ]
        }
      };
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Add Row
    ////////////////////////////////////////////////////////////////////////////////

    case BuilderActions.ADD_ROW: {
      return {
        ...state,
        grid: {
          ...state.grid,
          rows: [
            ...state.grid.columns,
            action.row
          ]
        }
      };
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Delete Column
    ////////////////////////////////////////////////////////////////////////////////

    case BuilderActions.DELETE_COLUMN: {
      return {
        ...state,
        grid: {
          ...state.grid,
          columns: state.grid.columns
            .filter((column, index) => action.position !== index)
        }
      };
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Delete Row
    ////////////////////////////////////////////////////////////////////////////////

    case BuilderActions.DELETE_ROW: {
      return {
        ...state,
        grid: {
          ...state.grid,
          rows: state.grid.rows
            .filter((row, index) => action.position !== index)
        }
      };
    }

    default: {
      return state;
    }
  }

}

export const appReducers: ActionReducerMap<AppState> = {
  app: builderReducer
};
