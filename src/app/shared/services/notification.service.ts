import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationStatus } from '../components/notification/notification';
import { NotificationComponent } from '../components/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        status: NotificationStatus.SUCCESS,
        message: message,
      },
    });
  }

  showFail(message: string) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        status: NotificationStatus.FAIL,
        message: message,
      },
    });
  }
}
