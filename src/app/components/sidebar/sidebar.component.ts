// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Services
import { FormsService } from 'src/app/services';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as BuilderSelectors from '../../store/app.selector';
import { UpdateGrid, AddColumn, AddRow } from 'src/app/store/app.action';

// rxjs
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar">
      <!-- <div
        class="sidebar__toggle"
        (click)="toggleSidebar()"
      >
        <sds-icon
          type="dark-background"
          [iconType]="open ? 'arrow_left' : 'arrow_right'"
        >
        </sds-icon>
      </div> -->

      <div class="heading">Configuration</div>

      <app-grid-form [gridForm]="gridForm">
      </app-grid-form>

      <hr/>

      <sds-tabs>
        <sds-tab>
          <sds-tab-header (tabSelected)="columnForm.reset()">
            Add Column
          </sds-tab-header>
          <sds-tab-content>
            <app-axis-form
              [axisForm]="columnForm"
              (axisAdded)="addColumn()"
            >
            </app-axis-form>
          </sds-tab-content>
        </sds-tab>

        <sds-tab>
          <sds-tab-header (tabSelected)="rowForm.reset()">
            Add Row
          </sds-tab-header>
          <sds-tab-content>
            <app-axis-form
              [axisForm]="rowForm"
              (axisAdded)="addRow()"
            >
            </app-axis-form>
          </sds-tab-content>
        </sds-tab>
      </sds-tabs>

      <hr/>

      <sds-button (clickEvent)="getStyles()">
        Get Styles
      </sds-button>

      <pre
        *ngIf="generatedStyles"
        class="output-styles"
      >
#grid &#123;
    {{ generatedStyles }}
&#125;
</pre>

    </div>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  gridForm: FormGroup;
  columnForm: FormGroup;
  rowForm: FormGroup;

  generatedStyles: string;

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

  getStyles() {
    const styles = document.getElementById('grid').style.cssText;

    this.generatedStyles = styles.replace(/; /g, ';\n    ');
  }
}
