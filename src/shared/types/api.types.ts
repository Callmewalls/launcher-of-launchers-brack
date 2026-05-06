export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface IAuthPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface IUserRegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface IUserLoginDto {
  email: string;
  password: string;
}

export interface ILauncherLinkDto {
  launcherType: string;
  accountName: string;
  credentials?: any;
}
