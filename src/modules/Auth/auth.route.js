import express from "express";
import checkToken from "middlewares/token.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import authController from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.validate";

const AuthRouter = express.Router();

AuthRouter.route("/getMe").get(checkToken, authController.getMe);
AuthRouter.route("/login").post(
  validateBody(loginSchema),
  authController.login
);
AuthRouter.route("/register").post(
  validateBody(registerSchema),
  authController.register
);

export default AuthRouter;
