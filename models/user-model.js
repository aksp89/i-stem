const mongoose = require("mongoose");
const { DbConnection } = require("../config/database/db_connection");

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false
		},
		status: {
			type: Number,
			required: true,
			default: 1,
			min: 1,
			max: 3
		}
	},
	{
		timestamps: true
	}
);

class UserModel extends DbConnection {
	static getSchema() {
		return mongoose.model("User", userSchema);;
	}
}

module.exports = {
	UserModel
};