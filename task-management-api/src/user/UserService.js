const userModel = require("./UserModel");
const UserService = {};
UserService.registerUser = async (name,email,password) => {
  const UserData = await userModel.create({
    name,email,password
  });
  return UserData;
};
UserService.LoginUser = async (name,email,hashPassword) => {
  const UserData = await userModel.create({
    name,email,password:hashPassword
  });
  return UserData;
};
UserService.GetProfile = async () => {
  const UserData = await userModel.find({});
  return UserData;
};
UserService.GetUser = async () => {
  const UserData = await userModel.find({});
  return UserData;
};


module.exports = UserService;
