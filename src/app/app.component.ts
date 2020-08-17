// Angular
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import * as BuilderSelectors from './store/app.selector';

// rxjs
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <app-sidebar [padContent]="true">
      <div class="title">
        Grid Layout Builder
      </div>

      <app-grid-form>
      </app-grid-form>
    </app-sidebar>

    <div class="content">
      <app-grid-view>
      </app-grid-view>
    </div>

    <app-sidebar>
      <div class="heading ml">CSS:</div>

      <pre>
        <div class="generated-styles">.grid-container &#123;
<span
  *ngFor="let style of (styles$ | async) | keyvalue"
>  {{ style.key | camelToKebab }}: {{ style.value }};
</span><span
  *ngFor="let itemStyle of (itemStyles$ | async); let i = index"
>
  .item-{{ i }} &#123;
    grid-area: {{ itemStyle.gridArea }};
  &#125;
</span>&#125;</div>
      </pre>

      <div class="heading ml">HTML:</div>

      <pre>
        <div class="generated-styles">{{ html$ | async }}</div>
      </pre>
    </app-sidebar>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  gridForm: FormGroup;

  styles$: Observable<{[key: string]: any}> =
    this.store.select(BuilderSelectors.selectGridStyle);

  itemStyles$: Observable<{[key: string]: any}[]> =
    this.store.select(BuilderSelectors.selectGridItemStyles);

  html$: Observable<string> =
    this.store.select(BuilderSelectors.selectHTML);

  constructor(private store: Store<AppState>) {}

}
