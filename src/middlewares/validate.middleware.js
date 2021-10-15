import Result from "../helpers/result.helper";

export const validateBody = (schema) => async (req, res, next) => {
  try {
    const value = schema.validate({ ...req.body }, { abortEarly: false });
    if (value.error) {
      const error = value.error.details.map((err) => {
        return err.message.replace(/[""]/g, "");
      });
      return Result.error(res, { message: error });
    }
    next();
  } catch (error) {
    return next(error);
  }
};

export const validateQuery = (schema) => async (req, res, next) => {
  try {
    const value = schema.validate({ ...req.query }, { abortEarly: false });
    if (value.error) {
      const error = value.error.details.map((err) => {
        return err.message.replace(/[""]/g, "");
      });
      return Result.error(res, { message: error });
    }
    next();
  } catch (error) {
    return next(error);
  }
};

export const validateParams = (schema) => async (req, res, next) => {
  try {
    const value = schema.validate({ ...req.params }, { abortEarly: false });
    if (value.error) {
      const error = value.error.details.map((err) => {
        return err.message.replace(/[""]/g, "");
      });
      return Result.error(res, { message: error });
    }
    next();
  } catch (error) {
    return next(error);
  }
};
