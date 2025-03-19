export interface IUser {
  email: string;
  name: string;
  avatarURL: string;
  role: string;
}

export interface IToken {
  token: string;
}

export interface IUserAuthResponse extends IToken {
  user: IUser;
}

export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest extends IAuthRequest {
  name: string;
  avatar?: File;
  licenseAccepted: boolean;
}

export interface IUpdateAvatarRequest {
  avatar: File;
}

export interface IUpdateAvatarResponse {
  avatarURL: string;
}
