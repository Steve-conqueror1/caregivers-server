export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export type UserType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type Auth = {
  email: string;
  password: string;
};
