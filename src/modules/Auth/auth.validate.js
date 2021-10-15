import Joi from "joi";

export const loginSchema = Joi.object({
  account: Joi.string().required().min(6).max(35),
  password: Joi.string().required().min(6).max(35),
});

export const registerSchema = Joi.object({
  fullname: Joi.string().required().min(2).max(35),
  username: Joi.string().required().min(6).max(35),
  email: Joi.string()
    .required()
    .regex(/(\W|^)[\w.+\-]*@gmail\.com(\W|$)/)
    .min(6)
    .max(35)
    .messages({ "string.pattern.base": "please enter a valid email address" }),
  password: Joi.string().required().min(6).max(35),
});
