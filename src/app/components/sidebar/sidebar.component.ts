// Angular
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar" [class.sidebar--padded]="padContent">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input()
  padContent = false;
}
