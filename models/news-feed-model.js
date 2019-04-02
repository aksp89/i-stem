const mongoose = require("mongoose");
const { UserModel } = require("./user-model");
const { DbConnection } = require("../config/database/db_connection");
const { NewsFeedCommentsModel } = require("./news-feed-comment-model");

const newsFeedSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: UserModel,
			required: true
		},
		updated_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: UserModel
		},
		title: {
			type: String,
			required: true
		},
		news: {
			type: String,
			required: true
		},
		upvotes: [{
			type: mongoose.Schema.Types.ObjectId,
			required: true
		}],
		downvotes: [{
			type: mongoose.Schema.Types.ObjectId,
			required: true
		}],
		status: {
			type: Number,
			required: true,
			default: 1,
			min: 1,
			max: 3
		},
		comments: [{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: NewsFeedCommentsModel
		}]
	},
	{
		timestamps: true
	}
);

class NewsFeedModel extends DbConnection {
	static getSchema() {
		return mongoose.model("NewsFeed", newsFeedSchema);
	}
}

module.exports = {
	NewsFeedModel
};