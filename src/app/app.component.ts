// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

// Services
import { FormsService } from './services';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import * as BuilderSelectors from './store/app.selector';
import { UpdateGrid, ResetGrid } from './store/app.action';

// rxjs
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { getInitialGrid, GridModel } from './models';

@Component({
  selector: 'app-root',
  template: `
    <app-sidebar>
      <div class="title">
        Grid Layout Builder
      </div>

      <app-grid-form
        [gridForm]="gridForm"
        (columnAdded)="addColumn()"
        (rowAdded)="addRow()"
      >
      </app-grid-form>
    </app-sidebar>

    <div class="content">
      <app-grid-view>
      </app-grid-view>
    </div>

    <app-sidebar>
      <div class="heading">CSS:</div>

      <pre>
        <div class="generated-styles">.grid-container &#123;
<span
  *ngFor="let style of (styles$ | async) | keyvalue"
  class="css-style"
>  {{ style.key | camelToKebab }}: {{ style.value }};
</span>&#125;</div>
      </pre>

      <div class="heading">HTML:</div>

      <pre>
        <div class="generated-styles">{{ html$ | async }}</div>
      </pre>

      <sds-button (clickEvent)="resetForm()">
        Reset
      </sds-button>
    </app-sidebar>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  gridForm: FormGroup;

  styles$: Observable<{[key: string]: any}> =
    this.store.select(BuilderSelectors.selectGridStyle);

  html$: Observable<string> =
   this.store.select(BuilderSelectors.selectHTML);

  constructor(
    private store: Store<AppState>,
    private formsService: FormsService) {}

  ngOnInit() {
    this.store.select(BuilderSelectors.selectGrid)
      .pipe(take(1))
      .subscribe(grid => {
        this.gridForm = this.formsService.createGridForm(grid);

        this.gridForm.valueChanges.subscribe(updatedGrid => {
          this.store.dispatch(new UpdateGrid(updatedGrid));
        });
      });
  }

  createGridForm(grid: GridModel) {
    this.gridForm = this.formsService.createGridForm(grid);

    this.gridForm.valueChanges.subscribe(updatedGrid => {
      this.store.dispatch(new UpdateGrid(updatedGrid));
    });
  }

  addColumn() {
    const columnForms = this.gridForm.get('columns') as FormArray;

    columnForms.push(this.formsService.createAxisForm(
      { size: '1', unit: 'fr' }
    ));
  }

  addRow() {
    const rowForms = this.gridForm.get('rows') as FormArray;

    rowForms.push(this.formsService.createAxisForm(
      { size: '1', unit: 'fr' }
    ));
  }

  resetForm() {
    const defaultGrid = getInitialGrid();

    this.store.dispatch(new ResetGrid(defaultGrid));
    this.createGridForm(defaultGrid);
  }

}
