const { DbConnection } = require("../../config/database/db_connection");
const { Authentication } = require("../firebase/authentication");
const { UserModel } = require("../../models/user-model");

const requiredKeys = ["idtoken"];

class UserUtility {


  enableUser(req, res) {

  }

  disableUser(req, res) {

  }

  deleteUser(req, res) {

  }
}

module.exports = {
  UserUtility
}