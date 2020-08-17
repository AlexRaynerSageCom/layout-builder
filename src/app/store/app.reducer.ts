// ngrx
import { ActionReducerMap } from '@ngrx/store';
import * as BuilderActions from './app.action';

// Models
import { AppState, BuilderState } from './app.state';
import { getInitialGrid, getGridItem, getInitialAxis } from '../models';

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
            getInitialAxis()
          ],
          items: [
            ...state.grid.items,
            ...Array(state.grid.rows.length).fill(null).map((value, index) => {
              return getGridItem(index + 1, state.grid.columns.length + 1);
            })
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
            ...state.grid.rows,
            getInitialAxis()
          ],
          items: [
            ...state.grid.items,
            ...Array(state.grid.columns.length).fill(null).map((value, index) => {
              return getGridItem(state.grid.rows.length + 1, index + 1);
            })
          ]
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
          columns: state.grid.columns.filter((column, index) => index !== action.index),
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
          rows: state.grid.rows.filter((row, index) => index !== action.index),
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
