import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <div
      class="sidebar"
      [class.sidebar--open]="open"
    >
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

    </div>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  open = true;

  toggleSidebar() {
    this.open = !this.open;
  }
}
