import { verify } from 'argon2';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import argon2 from 'argon2';
import { CustomError, UserType, Auth } from '../types';

import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import {
  ACCESS_SECRET,
  CLIENT_URL,
  INFORMER_API,
  JWT_SECRET,
  REFRESH_SECRET,
} from '../constants';
import { decrypt, encrypt } from '../utils';
import { resetPassword } from '../emailTemplates/resetPassword';

const userRepository = AppDataSource.getRepository(User);

export const signUp = async (user: UserType) => {
  const existingUser = await userRepository.findOneBy({ email: user.email });
  if (existingUser) {
    throw new CustomError('User already exists, Login Instead', 429);
  }
  const newUser = await userRepository.save(user);

  const { password, ...data } = newUser;
  return data;
};

export const signIn = async (login: Auth) => {
  const existingUser = await userRepository.findOneBy({ email: login.email });

  if (!existingUser) {
    throw new CustomError('Invalid credentials', 400);
  }

  const passwordMatch = await verify(existingUser.password, login.password);
  if (!passwordMatch) {
    throw new CustomError('Invalid credentials', 400);
  }

  const token_payload = {
    userId: existingUser.id,
    email: existingUser.email,
  };

  const accessToken = jwt.sign(token_payload, ACCESS_SECRET!, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(token_payload, REFRESH_SECRET!, {
    expiresIn: '1d',
  });

  return { accessToken, refreshToken };
};

export const getAuthenticatedUser = async (cookie: string) => {
  const payload: any = jwt.verify(cookie, ACCESS_SECRET!);

  if (!payload) {
    throw new CustomError('UnAuthenticated', 401);
  }

  const authenticatedUser = await userRepository.findOneBy({
    id: payload.userId,
  });

  if (!authenticatedUser) {
    throw new CustomError('UnAuthenticated', 401);
  }

  const { password, ...data } = authenticatedUser;

  return data;
};

export const refreshToken = async (cookie: string) => {
  const payload: any = jwt.verify(cookie, REFRESH_SECRET!);

  if (!payload) {
    throw new CustomError('UnAuthenticated', 401);
  }

  const accessToken = jwt.sign(
    { userId: payload.id, email: payload.email },
    ACCESS_SECRET!,
    {
      expiresIn: '15m',
    }
  );

  return { accessToken };
};

export const forgotPassword = async (email: string) => {
  const token = jwt.sign({ email }, JWT_SECRET!);
  const confirmationToken = encrypt(token);

  const resetLink = `${CLIENT_URL}/reset-password/?token=${confirmationToken}`;
  await axios
    .post(`${INFORMER_API}/sendEmail`, {
      from: 'Care Team',
      address: 'CARE <admin@compassionlink.com>',
      to: email,

      subject: 'Compassion Link - Reset password',
      template: resetPassword({ resetLink }),
    })
    .catch((err) => {
      throw new CustomError('Error sending email', 500);
    });

  return { message: 'Instructions to reset your password send to your email' };
};

export const setNewPassword = async (
  confirmationHash: string,
  password: string
) => {
  const confirmationToken = decrypt(confirmationHash);
  const decoded = jwt.verify(confirmationToken, JWT_SECRET!);

  const { email } = decoded as { email: string };
  const hashedPassword = await argon2.hash(password);

  const userToUpdate = await userRepository.findOne({
    where: {
      email,
    },
  });
  if (!userToUpdate) {
    throw new CustomError('User not found', 404);
  }
  userToUpdate.password = hashedPassword;

  await userRepository.save(userToUpdate);

  return { message: 'Password reset successful' };
};
