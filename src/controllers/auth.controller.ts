import { NextFunction, Request, Response } from 'express';
import {
  forgotSchema,
  loginSchema,
  registrationSchema,
  resetPasswordSchema,
} from '../schemas/user';
import { CustomError } from '../types';
import { User } from '../entities/user.entity';
import {
  forgotPassword,
  getAuthenticatedUser,
  refreshToken,
  signIn,
  signUp,
  setNewPassword,
} from '../services/auth.service';
import argon2 from 'argon2';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    const { error: validationError } = registrationSchema.validate(body);

    if (validationError) {
      const error = new CustomError(validationError.details[0].message, 422);
      return next(error);
    }
    const { firstName, lastName, email, password } = body;

    const hashedPassword = await argon2.hash(password);
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email.toLocaleLowerCase();
    user.password = hashedPassword;

    const data = await signUp(user);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    const { error: validationError } = loginSchema.validate(body);
    if (validationError) {
      const error = new CustomError(validationError.details[0].message, 422);
      return next(error);
    }
    const { email, password } = body;

    const { accessToken, refreshToken } = await signIn({ email, password });
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: 'Login successiful' });
  } catch (error) {
    next(error);
  }
};

export const authenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.cookies['access_token'];
    if (!cookie) {
      throw new CustomError('Authentication is required', 401);
    }
    const data = await getAuthenticatedUser(cookie);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.cookies['refresh_token'];
    if (!cookie) {
      throw new CustomError('Authentication is required', 401);
    }
    const data = await refreshToken(cookie);

    res.cookie('access_token', data.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.cookie('access_token', '', { maxAge: 0 });
  res.cookie('refresh_token', '', { maxAge: 0 });
  res.status(200).json({ message: 'Logout successful' });
};

export const forgot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const { error: validationError } = forgotSchema.validate(body);

    if (validationError) {
      const error = new CustomError(validationError.details[0].message, 422);
      return next(error);
    }

    const { email } = body;
    const data = await forgotPassword(email);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const { error: validationError } = resetPasswordSchema.validate(body);

    if (validationError) {
      const error = new CustomError(validationError.details[0].message, 422);
      return next(error);
    }

    const { token, password, passwordConfirm } = body;

    if (password !== passwordConfirm) {
      throw new CustomError('Passwords do not match', 404);
    }

    const data = await setNewPassword(token, password);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
