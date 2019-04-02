const { DbConnection } = require("../../config/database/db_connection");
const { Authentication } = require("../firebase/authentication");
const { UserModel } = require("../../models/user-model");

const requiredKeys = ["idtoken"];

class AdminAccess {
	grantAdminAccess(req, res) {
		
	}

	remokeAdminAccess(req, res) {

	}
}

module.exports = {
	AdminAccess
}
