const admin = require("firebase-admin");
const { web_config, admin_config } = require("../../config/firebase/config")

admin.initializeApp({
	credential: admin.credential.cert(admin_config),
	databaseURL: web_config.databaseURL
});

class Authentication {
	verifyIdToken(idToken) {
		return admin.auth().verifyIdToken(idToken);
	}
}



module.exports = {
	Authentication
}

