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
    // Reset Grid
    ////////////////////////////////////////////////////////////////////////////////

    case BuilderActions.RESET_GRID: {
      return {
        ...state,
        grid: action.grid
      };
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Add Grid Item
    ////////////////////////////////////////////////////////////////////////////////

    case BuilderActions.UPDATE_GRID_ITEM: {
      return {
        ...state,
        grid: {
          ...state.grid,
          items: [
            ...state.grid.items.map((item, index) => {
              return {
                ...item,
                generated: index === action.index
                  ? false
                  : item.generated
              };
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
