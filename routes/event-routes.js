const express = require("express");
const { Event } = require("../controllers/event/event");

class EventRoutes {
    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router
            .get("/getApplication/:applicationId", new Event().getApplication)
            .get("/getAllApplication/:eventName", new Event().getAllApplication)
            .post("/addApplication", new Event().addApplication)
            .put("/updateApplication", new Event().updateApplication)
            .delete("deleteApplication", new Event().deleteApplication);
    }
}

module.exports = {
    EventRoutes
};