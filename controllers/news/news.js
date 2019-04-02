const { DbConnection } = require("../../config/database/db_connection");
const { Authentication } = require("../firebase/authentication");
const { NewsFeedModel } = require("../../models/news-feed-model");
const { UserModel } = require("../../models/user-model");

const requiredKeys = ["idtoken"];

class News {
	getNews(req, res) {
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
					return NewsFeedModel.getSchema().findById(req.params.newsId).exec();
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User either not registered or not have the privilege to add post"
						}
					});
				}
			})
			.then((news) => {
				res.status(200).json({
					status: true,
					data: news
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

	getAllNews(req, res) {
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
					return NewsFeedModel.getSchema().find({ status: 1 }).exec();
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User either not registered or not have the privilege to add post"
						}
					});
				}
			})
			.then((user_data) => {
				console.log("User Saved.");
				res.status(200).json({
					status: true,
					data: user_data
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

	addNews(req, res) {
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
					return NewsFeedModel.getSchema().create({
						...req.body,
						userId: user_found._id,
					});
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User either not registered or not have the privilege to add post"
						}
					});
				}
			})
			.then(() => {
				console.log("User Saved.");
				res.status(200).json({
					status: true,
					data: {
						message: "News successfully saved."
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

	updateNews(req, res) {
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
					user["_id"] = user_found._id;
					return NewsFeedModel.getSchema().findByIdAndUpdate(req.params.newsId, {
						...req.body,
						updated_by: user._id
					}).exec();
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User either not registered or not have the privilege to add post"
						}
					});
				}
			})
			.then(() => {
				console.log("News Updated.");
				res.status(200).json({
					status: true,
					data: {
						message: "News Updated"
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

	deleteNews(req, res) {
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
				user["_id"] = user_found._id;
				if (user_found) {
					return NewsFeedModel.getSchema().findByIdAndUpdate(req.params.newsId, {
						 status: 2, 
						 updated_by: user._id
						 }).exec();
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User either not registered or not have the privilege to add post"
						}
					});
				}
			})
			.then((user_data) => {
				console.log("User Saved.");
				res.status(200).json({
					status: true,
					data: {
						message: "News Deleted"
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
			});
	}
};

module.exports = {
	News
}