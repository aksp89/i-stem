const { DbConnection } = require("../../config/database/db_connection");
const { Authentication } = require("../firebase/authentication");
const { NewsFeedModel } = require("../../models/news-feed-model");
const { UserModel } = require("../../models/user-model");

const requiredKeys = ["idtoken"];

class Event {
    getApplication(req, res){}
    getAllApplication(req, res){}
    addApplication(req, res){}
    updateApplication(req, res){}
    deleteApplication(req, res){}
}

module.exports = {
    Event
}