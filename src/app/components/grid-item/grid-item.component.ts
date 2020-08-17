// Angular
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Models
import { GridItemModel } from 'src/app/models';

@Component({
  selector: 'app-grid-item',
  template: `
    <div
      class="grid-item"
      [class.grid-item--generated]="item.generated"
      [style]="styles"
      (click)="item.generated && addItem()"
    >
      <ng-container *ngIf="!item.generated; else generated">
        {{ 'item' }}
      </ng-container>

      <ng-template #generated>
        <sds-icon
          class="add-icon"
          iconType="plus"
        ></sds-icon>
      </ng-template>
    </div>
  `,
  styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent {
  @Input()
  item: GridItemModel;

  @Output()
  itemAdded: EventEmitter<void> = new EventEmitter<void>();

  get styles() {
    return {
      gridArea: `${this.item.rowStart} / ${this.item.columnStart} / ${this.item.rowEnd} / ${this.item.columnEnd}`
    };
  }

  addItem() {
    this.itemAdded.emit();
  }
}
