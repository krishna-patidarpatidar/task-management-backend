const userModel = require("../user/UserModel");
const UserService = require("./UserService");
const jwttoken = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);

const UserController = {};

UserController.RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    const user = await userModel.findOne({ email });

    if (user) {
      return res.send({
        status: false,
        msg: "email already axeist",
        data: null,
      });
    }
    const createdUser = await UserService.registerUser(
      name,
      email,
      hashPassword
    );
    if (createdUser) {
      var token = jwttoken.sign(
        { _id: createdUser._id },
        process.env.JWT_SECRET
      );
      createdUser.password = undefined;
      return res.send({
        status: true,
        msg: "User registered successfully",
        userId: createdUser._id,
        token: token,
      });
    }
  } catch (err) {
    console.log(err);
    return res.send({ status: false, msg: "something went wrong", err });
  }
};
UserController.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        status: false,
        msg: "enter valid email",
        data: null,
      });
    }
    let compare = bcrypt.compareSync(password, user.password);
    user.password = undefined;
    if (compare) {
      var token = jwttoken.sign({ _id: user._id }, process.env.JWT_SECRET);
      return res.send({
        status: true,
        msg: "user login successfully",
        userId: user._id,
        token: token,
      });
    } else {
      return res.send({ status: false, msg: "invalid credantials" });
    }
  } catch (err) {
    console.log(err);
    return res.send({ status: false, msg: "something went wrong", err });
  }
};
UserController.GetProfile = async (req, res) => {
  const id = req._id;
  try {
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.send({
        status: false,
        msg: "something went wrong",
        data: null,
      });
    }
    res.send({
      status: true,
      msg: "users geted succesfully",
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        watchedMovies: user.watchedMovies,
        watchlist: user.watchlist,
      },
    });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, msg: "something went wrong", err });
  }
};
UserController.GetUsers = async (req, res) => {
  try {
    const user = await userModel.find().sort({ createdAt: -1 });
    user.password = undefined;
    if (!user) {
      return res.send({
        status: false,
        msg: "something went wrong",
        data: null,
      });
    }
    res.send({
      status: true,
      msg: "users geted succesfully",
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        watchedMovies: user.watchedMovies,
        watchlist: user.watchlist,
      },
    });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, msg: "something went wrong", err });
  }
};

module.exports = UserController;
