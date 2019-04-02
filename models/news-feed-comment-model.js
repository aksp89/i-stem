const mongoose = require("mongoose")
const { UserModel } = require("./user-model");
const { DbConnection } = require("../config/database/db_connection");

const newsFeedCommentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserModel,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

class NewsFeedCommentModel extends DbConnection {
    static getSchema() {
        return mongoose.model("NewsFeedComment", newsFeedCommentSchema);;
    }
}

module.exports = {
    NewsFeedCommentModel
};