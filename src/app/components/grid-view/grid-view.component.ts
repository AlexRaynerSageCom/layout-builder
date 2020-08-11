import { Component, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { GridModel } from '../../models';

@Component({
  selector: 'app-grid-view',
  template: `
    <button (click)="getStyles()">
      Get Styles
    </button>

    <pre
      *ngIf="generatedStyles"
      class="output-styles"
    >
.grid &#123;
    {{ generatedStyles }}
&#125;
</pre>

    <div
      #grid
      id="grid"
      class="grid"
      [style]="styles"
    >
      <div
        class="grid__item"
        *ngFor="let item of size"
      >
        ITEM
      </div>
    </div>
  `,
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements AfterViewInit {
  @ViewChild('grid') gridElem: ElementRef;

  @Input() grid: GridModel;

  generatedStyles: string;

  ngAfterViewInit() {
    this.gridElem.nativeElement.style.display = 'grid';
  }

  getStyles() {
    const styles = this.gridElem.nativeElement.style.cssText;

    this.generatedStyles = styles.replace(/; /g, ';\n    ');
  }

  get size() {
    return new Array(this.grid.columns * Math.max(1, this.grid.rows));
  }

  get styles() {
    const fr = '1fr ';

    return {
      gridTemplateColumns: fr.repeat(this.grid.columns),
      gridTemplateRows: fr.repeat(this.grid.rows),
      gridColumnGap: this.grid.columnGap + 'px',
      gridRowGap: this.grid.rowGap + 'px',
    };
  }
}
