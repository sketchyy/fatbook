import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import {
  NotificationConfig as NotificationData,
  NotificationStatus,
} from './notification';

@Component({
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
  icon: string;

  constructor(
    private snackBarRef: MatSnackBarRef<NotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData
  ) {}

  ngOnInit(): void {
    this.icon =
      this.data.status === NotificationStatus.SUCCESS
        ? 'check_circle'
        : 'error';
  }

  isSuccess() {
    return this.data.status === NotificationStatus.SUCCESS;
  }

  isFail() {
    return this.data.status === NotificationStatus.FAIL;
  }

  dismiss() {
    this.snackBarRef.dismiss();
  }
}
