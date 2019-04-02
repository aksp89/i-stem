const { DbConnection } = require("../../config/database/db_connection");
const { UserModel } = require("../../models/user-model");
const { UserInfoModel } = require("../../models/user-info-model");
const { Authentication } = require("../firebase/authentication");

const requiredKeys = ["idtoken"];

class UserInfo {
	getUserInfo(req, res) {
		requiredKeys.forEach((key) => {
			if (!req.headers[key]) {
				res.status(400).json({
					status: false,
					data: {
						error: `${key} not found or found empty`
					}
				});
				return;
			}
		});

		let user = {};
		new Authentication().verifyIdToken(req.headers.idtoken)
			.then((user_data) => {
				user = {
					email: user_data.email,
					userId: user_data.user_id
				};
				return DbConnection.dbConnect();
			})
			.then(() => {
				console.log("Db connected.");
				return UserModel.getSchema().findOne({
					userId: user.userId,
					status: 1
				}).exec();
			})
			.then((user_found) => {
				if (user_found) {
					return UserInfoModel.getSchema().findOne({ userId: user_found._id }).exec();
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User not registered"
						}
					});
				}
			})
			.then((user_info) => {
				res.status(200).json({
					status: true,
					data: user_info
				});
				return DbConnection.dbDisconnect();
			})
			.then(() => {
				console.log("Connection closed");
			})
			.catch((err) => {
				if (err.status_code) {
					res.status(err.status_code).json({
						status: false,
						data: err.data
					});
				} else {
					res.status(400).json({
						status: false,
						data: {
							error: err.message || "Invalid auth token"
						}
					});
				}
				DbConnection.dbDisconnect()
					.then(() => {
						console.log("Connection closed");
					});
			});
	}

	getAllUsers(req, res) {
		requiredKeys.forEach((key) => {
			if (!req.headers[key]) {
				res.status(400).json({
					status: false,
					data: {
						error: `${key} not found or found empty`
					}
				});
				return;
			}
		});

		let user = {};
		new Authentication().verifyIdToken(req.headers.idtoken)
			.then((user_data) => {
				user = {
					email: user_data.email,
					userId: user_data.user_id
				};
				return DbConnection.dbConnect();
			})
			.then(() => {
				console.log("Db connected.");
				return UserModel.getSchema().findOne({
					userId: user.userId,
					status: 1,
					isAdmin: true
				}).exec();
			})
			.then((user_found) => {
				if (user_found) {
					return UserInfoModel.getSchema().find().exec();
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User not registered or user does not have the admin access."
						}
					});
				}
			})
			.then((users_info) => {
				res.status(200).json({
					status: true,
					data: users_info
				});
				return DbConnection.dbDisconnect();
			})
			.then(() => {
				console.log("Connection closed");
			})
			.catch((err) => {
				if (err.status_code) {
					res.status(err.status_code).json({
						status: false,
						data: err.data
					});
				} else {
					res.status(400).json({
						status: false,
						data: {
							error: err.message || "Invalid auth token"
						}
					});
				}
				DbConnection.dbDisconnect()
					.then(() => {
						console.log("Connection closed");
					});
			});
	}

	addUserInfo(req, res) {
		requiredKeys.forEach((key) => {
			if (!req.headers[key]) {
				res.status(400).json({
					status: false,
					data: {
						error: `${key} not found or found empty`
					}
				});
				return;
			}
		});

		let user = {};
		new Authentication().verifyIdToken(req.headers.idtoken)
			.then((user_data) => {
				user = {
					email: user_data.email,
					userId: user_data.user_id
				};
				return DbConnection.dbConnect();
			})
			.then(() => {
				console.log("Db connected.");
				return UserModel.getSchema().findOne({
					userId: user.userId,
					status: 1
				}).exec();
			})
			.then((user_found) => {
				if (user_found) {
					user["_id"] = user_found._id;
					return UserInfoModel.getSchema().findOne({ userId: user._id }).exec();
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User not registered"
						}
					});
				}
			})
			.then((user_info_found) => {
				if (user_info_found) {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User Info already exist."
						}
					});
				} else {
					return UserInfoModel.getSchema().create({
						...req.body,
						userId: user._id,
						login_mail: user.email
					});
				}
			})
			.then((_user_data) => {
				console.log("User Saved.");
				res.status(200).json({
					status: true,
					data: {
						message: "User Info successfully saved."
					}
				});
				return DbConnection.dbDisconnect();
			})
			.then(() => {
				console.log("Connection closed");
			})
			.catch((err) => {
				if (err.status_code) {
					res.status(err.status_code).json({
						status: false,
						data: err.data
					});
				} else {
					res.status(400).json({
						status: false,
						data: {
							error: err.message || "Invalid auth token"
						}
					});
				}
				DbConnection.dbDisconnect()
					.then(() => {
						console.log("Connection closed");
					});
			});
	}

	updateUserInfo(req, res) {
		requiredKeys.forEach((key) => {
			if (!req.headers[key]) {
				res.status(400).json({
					status: false,
					data: {
						error: `${key} not found or found empty`
					}
				});
				return;
			}
		});

		let user = {};
		new Authentication().verifyIdToken(req.headers.idtoken)
			.then((user_data) => {
				user = {
					email: user_data.email,
					userId: user_data.user_id
				};
				return DbConnection.dbConnect();
			})
			.then(() => {
				console.log("Db connected.");
				return UserModel.getSchema().findOne({
					userId: user.userId,
					status: 1
				}).exec();
			})
			.then((user_found) => {
				if (user_found) {
					return UserInfoModel.getSchema().updateOne({ userId: user_found._id }, { $set: { ...req.body } }).exec();
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User not registered"
						}
					});
				}
			})
			.then(() => {
				console.log("User Info Updated");
				res.status(200).json({
					status: true,
					data: {
						message: "User Info Updated"
					}
				});
				return DbConnection.dbDisconnect();
			})
			.then(() => {
				console.log("Connection closed");
			})
			.catch((err) => {
				if (err.status_code) {
					res.status(err.status_code).json({
						status: false,
						data: err.data
					});
				} else {
					res.status(400).json({
						status: false,
						data: {
							error: err.message || "Invalid auth token"
						}
					});
				}
				DbConnection.dbDisconnect()
					.then(() => {
						console.log("Connection closed");
					});
			});
	}
}

module.exports = {
	UserInfo
};