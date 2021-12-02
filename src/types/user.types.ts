export enum UserType {
  User,
  Admin,
  Demo
}

export enum LoginType {
  Standard,
  Google
}

export interface User {
  fullname?: string;
  username: string;
  password: string;
  email: string;
  type: string;
  avatar?: string;
  disabled?: string;
  lastLoginIn?: Date;
  loginType?: LoginType;
}

export interface UserDetails {
  email: string;
  password: string;
}
