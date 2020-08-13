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
        grid: action.grid
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
