import { Component, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { GridModel } from '../../models';

@Component({
  selector: 'app-grid-view',
  template: `
    <sds-button (clickEvent)="getStyles()">
      Get Styles
    </sds-button>

    <pre
      *ngIf="generatedStyles"
      class="output-styles"
    >
.grid &#123;
    {{ generatedStyles }}
&#125;
</pre>

    <div class="grid-view">

      <div
        *ngIf="grid.columns.length > 0"
        class="columns"
        [style]="columnStyles"
      >
        <div
          *ngFor="let col of columnCount; let i = index"
          tabIndex="0"
          (click)="removeColumn(i)"
        >
          DELETE
        </div>
      </div>

      <div
        *ngIf="grid.rows.length > 0"
        class="rows"
        [style]="rowStyles"
      >
        <div
          *ngFor="let row of rowCount; let i = index"
          tabIndex="0"
          (click)="removeRow(i)"
        >
          DELETE
        </div>
      </div>

      <div
        #gridElem
        class="grid"
        [style]="styles"
      >
        <ng-container *ngIf="grid?.fillGrid">
          <div
            *ngFor="let item of count"
            class="grid__item"
          ></div>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements AfterViewInit {
  @ViewChild('gridElem') gridElem: ElementRef;

  @Input() grid: GridModel;

  generatedStyles: string;

  ngAfterViewInit() {
    this.gridElem.nativeElement.style.display = 'grid';
  }

  getStyles() {
    const styles = this.gridElem.nativeElement.style.cssText;

    this.generatedStyles = styles.replace(/; /g, ';\n    ');
  }

  removeColumn(index: number) {
    this.grid.columns.splice(index, 1);
  }

  removeRow(index: number) {
    this.grid.rows.splice(index, 1);
  }

  get columnCount() {
    return new Array(this.grid.columns.length);
  }

  get rowCount() {
    return new Array(this.grid.rows.length);
  }

  get count() {
    return new Array(this.grid.columns.length * Math.max(1, this.grid.rows.length));
  }

  get columnStyles() {
    return {
      gridTemplateColumns: this.grid.columns.map(column => `${column.size}${column.unit}`).join(' '),
      gridColumnGap: this.grid.columnGap + 'px'
    };
  }

  get rowStyles() {
    return {
      gridTemplateRows: this.grid.rows.map(row => `${row.size}${row.unit}`).join(' '),
      gridRowGap: this.grid.rowGap + 'px'
    };
  }

  get styles() {
    return {
      ...this.columnStyles,
      ...this.rowStyles
    };
  }
}
