const mongoose = require("mongoose")
const { DbConnection } = require("../config/database/db_connection");

const eventSchema = new mongoose.Schema(
    {
        event_type: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        programming_languages: String,
        technical_work_experience: String,
        technical_projects: String,
        previous_training: String,
        current_employment_state: Number, // Find Documenation below
        best_time_to_contact: String,
        availability: String,
        motivation: String,
        resume: String,
    },
    {
        timestamps: true
    }
);

class EventModel extends DbConnection {
    static getSchema() {
        return mongoose.model("Event", eventSchema);
    }
}

module.exports = {
    EventModel
};

/**
   * current_employment_state
   * E - Employed
   * S - Seeking Employment
   * ST - Student
   * R - Retired
   */