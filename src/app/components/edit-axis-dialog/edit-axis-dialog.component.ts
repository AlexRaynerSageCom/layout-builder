// Angular
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

// ngrx
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';

// Services
import { FormsService } from 'src/app/services';
import { DialogConfig, DialogRef } from '@sage/ng-carbon/dialog';
import { UpdateColumn, UpdateRow } from 'src/app/store/app.action';

@Component({
  template: `
    <sds-dialog-header>
      Edit {{ axisType | titlecase }} {{ position + 1  }}
    </sds-dialog-header>

    <sds-dialog-content>
      <app-axis-form
        [showDeleteButton]="true"
        [axisForm]="axisForm"
        (axisAdded)="update()"
        (axisRemoved)="remove()"
      >
      </app-axis-form>
    </sds-dialog-content>
  `
})
export class EditAxisDialogComponent {
  axisForm: FormGroup;
  axisType: 'column' | 'row';
  position: number;

  constructor(
    private formsService: FormsService,
    public config: DialogConfig,
    private dialogRef: DialogRef,
    private store: Store<AppState>) {

    this.axisForm = this.formsService.createAxisForm(config.data.axis);
    this.axisType = config.data.axisType;
    this.position = config.data.position;
  }

  update() {
    const action = this.axisType === 'column'
      ? new UpdateColumn({ index: this.position, axis: this.axisForm.value })
      : new UpdateRow({ index: this.position, axis: this.axisForm.value });

    this.store.dispatch(action);

    this.dialogRef.close();
  }

  remove() {
    this.dialogRef.close('Delete');
  }
}
