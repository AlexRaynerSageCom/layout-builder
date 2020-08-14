// Angular
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {}
