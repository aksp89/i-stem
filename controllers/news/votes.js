const { DbConnection } = require("../../config/database/db_connection");
const { Authentication } = require("../firebase/authentication");
const { NewsFeedModel } = require("../../models/news-feed-model");
const { UserModel } = require("../../models/user-model");

const requiredKeys = ["idtoken"];

class Votes {
	upvote(req, res) {
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
					return NewsFeedModel.getSchema().findById(req.params.newsId).exec();
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User not registered"
						}
					});
				}
			})
			.then((news_data) => {
				let index = news_data.upvotes.indexOf(user._id);
				if (index >= 0) {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "Already upvoted"
						}
					})
				} else {
					news_data.upvotes.push(user["_id"]);
					news_data.downvotes = news_data.downvotes.filter((userId) => userId.toString() !== user["_id"].toString());
					return news_data.save();
				}
			})
			.then(() => {
				res.status(200).json({
					status: true,
					data: {
						message: "upvote successfull"
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

	removeUpvote(req, res) {
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
					return NewsFeedModel.getSchema().findById(req.params.newsId).exec();
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User not registered"
						}
					});
				}
			})
			.then((news_data) => {
				news_data.upvotes = news_data.upvotes.filter((userId) => userId.toString() !== user["_id"].toString());
				return news_data.save();
			})
			.then(() => {
				res.status(200).json({
					status: true,
					data: {
						message: "remove upvote successfull"
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

	downvote(req, res) {
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
					return NewsFeedModel.getSchema().findById(req.params.newsId).exec();
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User not registered"
						}
					});
				}
			})
			.then((news_data) => {
				let index = news_data.downvotes.indexOf(user["_id"]);
				if (index >= 0) {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "Already upvoted"
						}
					})
				} else {
					news_data.downvotes.push(user["_id"]);
					news_data.upvotes = news_data.upvotes.filter((userId) => userId.toString() !== user["_id"].toString());
					return news_data.save();
				}
			})
			.then(() => {
				res.status(200).json({
					status: true,
					data: {
						message: "downvote successfull"
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

	removeDownvote(req, res) {
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
					return NewsFeedModel.getSchema().findById(req.params.newsId).exec();
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User not registered"
						}
					});
				}
			})
			.then((news_data) => {
				news_data.downvotes = news_data.downvotes.filter((userId) => userId.toString() !== user["_id"].toString());
				return news_data.save();
			})
			.then(() => {
				res.status(200).json({
					status: true,
					data: {
						message: "remove downvote successfull"
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
	Votes
}