const express = require("express");
const { News } = require("../controllers/news/news");
const { Votes } = require("../controllers/news/votes");
const { Comments } = require("../controllers/news/comments");

class NewsFeedRoutes {
	constructor() {
		this.router = express.Router();
		this.init();
	}

	init() {
		this.router
			.get("/getNews/:newsId", new News().getNews)
			.get("/getAllNews", new News().getAllNews)
			.post("/addNews", new News().addNews)
			.put("/updateNews/:newsId", new News().updateNews)
			.delete("/deleteNews/:newsId", new News().deleteNews);

		this.router
			.post("/upvote/:newsId", new Votes().upvote)
			.post("/removeUpvote/:newsId", new Votes().removeUpvote)
			.post("/downvote/:newsId", new Votes().downvote)
			.post("/removeDownvote/:newsId", new Votes().removeDownvote);

		this.router
			.get("/getComment/:commentId", new Comments().getComment)
			.post("/addComment/:newsId", new Comments().addComment)
			.put("/updateComment/:commentId", new Comments().updateComment)
			.delete("/deleteComment/:newsId/:commentId", new Comments().deleteComment);
	}
}

module.exports = {
	NewsFeedRoutes
};