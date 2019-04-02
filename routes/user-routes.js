const express = require("express");
const { User } = require("./../controllers/users/user");
const { UserInfo } = require("../controllers/users/user-info");

class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  init() {
    this.router.post("/addUser", new User().addUser);
    
    this.router
      .get("/getUserInfo", new UserInfo().getUserInfo)
      .get("/getAllUsers", new UserInfo().getAllUsers)
      .post("/addUserInfo", new UserInfo().addUserInfo)
      .put("/updateUserInfo", new UserInfo().updateUserInfo);
  }
}

module.exports = {
  UserRoutes
};