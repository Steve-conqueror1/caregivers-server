import Joi from 'joi';

export const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().label('Password'),
  passwordConfirm: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': "Password's do not match" })
    .label('Password Confirmation'),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().label('Password'),
});

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

export const forgotSchema = Joi.object({
  email: Joi.string().email().required(),
});
