// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Services
import { FormsService } from './services';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import * as BuilderSelectors from './store/app.selector';
import { UpdateGrid, AddColumn, AddRow } from './store/app.action';

// rxjs
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <app-sidebar>
      <div class="heading">Configuration</div>

      <app-grid-form [gridForm]="gridForm">
      </app-grid-form>
    </app-sidebar>

    <div class="content">
      <div class="title">
        Grid Layout Builder
      </div>

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
    </app-sidebar>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  gridForm: FormGroup;
  columnForm: FormGroup;
  rowForm: FormGroup;

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

    this.columnForm = this.formsService.createAxisForm();
    this.rowForm = this.formsService.createAxisForm();
  }

  addColumn() {
    this.store.dispatch(
      new AddColumn(this.columnForm.value)
    );
    this.columnForm.reset();
  }

  addRow() {
    this.store.dispatch(
      new AddRow(this.rowForm.value)
    );
    this.rowForm.reset();
  }

}

