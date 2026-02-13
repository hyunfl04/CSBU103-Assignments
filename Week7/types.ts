
export interface ValidationErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export interface RegistrationData {
  username: string;
  password?: string;
  confirmPassword?: string;
}

export enum RegistrationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
