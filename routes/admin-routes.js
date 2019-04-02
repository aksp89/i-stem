const express = require("express");
const { Admin } = require("../controllers/admin/admin");

class UserRoutes {
	constructor() {
		this.router = express.Router();
		this.init();
	}

	init() {
		this.router
			.post("/grantAdminAccess/:userId", new Admin().grantAdminAccess)
			.post("/remokeAdminAccess/:userId", new Admin().remokeAdminAccess);

		this.router
			.post("/enableUser/:userId", new Admin().enableUser)
			.delete("/disableUser/:userId", new Admin().disableUser)
			.delete("/deleteUser/:userId", new Admin().deleteUser);

		this.router
			.get("/getAllNews") // This will also return disabled and deleted news.
			.post("/enableNews")
			.delete("/disableNews")
			.delete("/deleteNews");

		this.router.delete("/deleteComment2");
	}
}

module.exports = {
	UserRoutes
};