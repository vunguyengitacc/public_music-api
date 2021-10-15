import Joi from "joi";

export const searchFullTextSchema = Joi.object({
  q: Joi.string().required(),
});
