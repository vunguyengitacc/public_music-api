import bcrypt from "bcrypt";
import Result from "helpers/result.helper";
import { createAccessToken } from "helpers/token.helper";
import User from "../User/user.model";

const getMe = async (req, res, next) => {
  try {
    Result.success(res, { currentUser: req.user }, 201);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { account, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: account }, { username: account }],
    }).select("+password");
    if (!user) {
      return Result.error(res, { message: "Email does not exist" }, 401);
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return Result.error(res, { message: "Wrong password" }, 401);
    }
    const access_token = createAccessToken(user);
    Result.success(res, { access_token }, 201);
  } catch (error) {
    return next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { fullname, username, email, password } = req.body;
    const checkUsername = await User.find({ username }).countDocuments();
    if (checkUsername) {
      return Result.error(res, { message: "This username is already in use" });
    }
    const checkEmail = await User.find({ email }).countDocuments();
    if (checkEmail) {
      return Result.error(res, { message: "This email is already in use" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
      profilePictureUrl: `https://avatars.dicebear.com/4.5/api/initials/${fullname}.svg`,
    });
    const access_token = createAccessToken(newUser);
    Result.success(res, { access_token }, 201);
  } catch (error) {
    return next(error);
  }
};

const authController = { login, register, getMe };
export default authController;
