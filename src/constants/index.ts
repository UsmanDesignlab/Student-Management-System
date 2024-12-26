export enum Roles {
  TEACHER = "TEACHER",
  STUDENT = 'STUDENT',
  ADMIN = "ADMIN"
}

export type jwtPayload = {
  userId: number;
  loggedInAs: Roles
}