const mongoose = require("mongoose");
const { env } = require("./db_keys");

const databaseName = "i-stem-app";

class DbConnection {

	static getMongoUri() {
		let mongoUri = `mongodb://${env.accountName}:${env.key}@${env.accountName}.documents.azure.com:${env.port}/${databaseName}?ssl=true`;
		return mongoUri;
	}

	static dbConnect() {
		return mongoose.connect(this.getMongoUri(), { useNewUrlParser: true });
	}

	static dbDisconnect() {
		return mongoose.connection.close();
	}
}

module.exports = {
	DbConnection
};