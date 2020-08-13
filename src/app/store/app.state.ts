import { GridModel } from '../models';

export interface BuilderState {
  grid: GridModel;
}

export interface AppState {
  app: BuilderState;
}
