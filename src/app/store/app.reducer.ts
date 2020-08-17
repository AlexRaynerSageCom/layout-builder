// ngrx
import { ActionReducerMap } from '@ngrx/store';
import * as BuilderActions from './app.action';

// Models
import { AppState, BuilderState } from './app.state';
import { getInitialGrid, getGridItem } from '../models';

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
    // Remove Column
    ////////////////////////////////////////////////////////////////////////////////

    case BuilderActions.REMOVE_COLUMN: {
      return {
        ...state,
        grid: {
          ...state.grid,
          items: state.grid.items
            .filter(item => item.columnStart - 1 !== action.index)
            .map(item => {
              return {
                ...item,
                ...(action.index < item.columnStart - 1
                  ? {columnStart: item.columnStart - 1, columnEnd: item.columnEnd - 1}
                  : {})
              };
            })
        }
      };
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Remove Row
    ////////////////////////////////////////////////////////////////////////////////

    case BuilderActions.REMOVE_ROW: {
      return {
        ...state,
        grid: {
          ...state.grid,
          items: state.grid.items
            .filter(item => item.rowStart - 1 !== action.index)
            .map(item => {
              return {
                ...item,
                ...(action.index < item.rowStart - 1
                  ? {rowStart: item.rowStart - 1, rowEnd: item.rowEnd - 1}
                  : {})
              };
            })
        }
      };
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Reset Grid
    ////////////////////////////////////////////////////////////////////////////////

    case BuilderActions.RESET_GRID: {
      return {
        ...state,
        grid: action.grid
      };
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Create Grid Item
    ////////////////////////////////////////////////////////////////////////////////

    case BuilderActions.CREATE_GRID_ITEM: {
      return {
        ...state,
        grid: {
          ...state.grid,
          items: [
            getGridItem(action.row, action.column, false),
            ...state.grid.items.filter(item => {
              return item.rowStart !== action.row || item.columnStart !== action.column;
            })
          ]
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
