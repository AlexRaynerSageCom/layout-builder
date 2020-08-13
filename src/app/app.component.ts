import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="content">
      <div class="title">
        Grid Layout Builder
      </div>

      <app-grid-view>
      </app-grid-view>
    </div>

    <app-sidebar>
    </app-sidebar>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
