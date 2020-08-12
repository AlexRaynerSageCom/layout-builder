import { Component, OnInit } from '@angular/core';
import { GridModel, getInitialGrid } from './models';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div class="text">Grid Layout Builder</div>
      <app-builder-form
        [grid]="grid"
        (gridChanged)="updateGrid($event)"
      >
      </app-builder-form>

      <app-grid-view [grid]="grid">
      </app-grid-view>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  grid: GridModel;

  ngOnInit() {
    this.grid = getInitialGrid();
  }

  updateGrid(grid: GridModel) {
    this.grid = grid;
  }
}
