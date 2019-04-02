const { DbConnection } = require("../../config/database/db_connection");
const { Authentication } = require("../firebase/authentication");
const { NewsFeedModel } = require("../../models/news-feed-model");
const { NewsFeedCommentModel } = require("../../models/news-feed-comment-model");
const { UserModel } = require("../../models/user-model");

const requiredKeys = ["idtoken"];

class Comments {
	getComment(req, res) {
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
					return NewsFeedCommentModel.getSchema().findById(req.params.commentId).exec();
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User not registered"
						}
					});
				}
			})
			.then((news_comment) => {
				res.status(200).json({
					status: true,
					data: news_comment
				})
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

	addComment(req, res) {
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

					let addCommentPromise = [
						NewsFeedModel.getSchema().findById(req.params.newsId).exec(),
						NewsFeedCommentModel.getSchema().create({
							...req.body,
							userId: user_found._id,
						})
					];
					return Promise.all(addCommentPromise);
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User not registered"
						}
					});
				}
			})
			.then((news_data_array) => {

				news_data_array[0].comments.push(news_data_array[1]._id);
				return news_data_array[0].save();
			})
			.then(() => {
				res.status(200).json({
					status: true,
					data: {
						message: "Comments successfully saved."
					}
				})
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

	updateComment(req, res) {
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
					return NewsFeedCommentModel.getSchema().findOne({
						_id: req.params.commentId,
						userId: user_found._id
					});
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User not registered"
						}
					});
				}
			})
			.then((news_comment) => {
				if (news_comment) {
					news_comment.comment = req.body.comment
					return news_comment.save()
				} else {
					return Promise.reject({
						status_code: 401,
						data: {
							error: "you cannot update another's person comment"
						}
					});
				}
			})
			.then(() => {
				res.status(200).json({
					status: true,
					data: {
						message: "Comment Updated"
					}
				})
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

	deleteComment(req, res) {
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
					let deleteCommentPromise = [
						NewsFeedModel.getSchema().findById(req.params.newsId).exec(),
						NewsFeedCommentModel.getSchema().findById(req.params.commentId).exec()
					];
					return Promise.all(deleteCommentPromise);
				} else {
					return Promise.reject({
						status_code: 406,
						data: {
							error: "User not registered"
						}
					});
				}
			})
			.then((news_data_array) => {
				if (news_data_array[1].userId.toString() === user._id.toString()) {
					news_data_array[0].comments = news_data_array[0].comments.filter((commentId) => commentId.toString() !== req.params.commentId.toString());
					return news_data_array[0].save();
				} else {
					return Promise.reject({
						status_code: 401,
						data: {
							error: "you cannot delete another person's comment"
						}
					});
				}
			})
			.then(() => {
				res.status(200).json({
					status: true,
					data: {
						message: "Comments successfully Deleted."
					}
				})
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

	deleteComment2(req, res) {
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
							error: "User not registered"
						}
					});
				}
			})
			.then((news_data) => {
				news_data.comments = news_data.comments.filter((commentId) => commentId.toString() !== req.params.commentId.toString());
				return news_data.save();
			})
			.then(() => {
				res.status(200).json({
					status: true,
					data: {
						message: "Comments successfully Deleted."
					}
				})
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
	Comments
}