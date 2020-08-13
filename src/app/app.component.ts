import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-sidebar>
    </app-sidebar>

    <div class="content">
      <div class="title">Grid Layout Builder</div>

      <app-grid-view>
      </app-grid-view>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
