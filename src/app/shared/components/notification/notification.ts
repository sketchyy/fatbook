export enum NotificationStatus {
  SUCCESS,
  FAIL,
}

export interface NotificationConfig {
  status: NotificationStatus;
  message: string;
}
