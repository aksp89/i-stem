const mongoose = require("mongoose");
const { UserModel } = require("./user-model");
const { DbConnection } = require("../config/database/db_connection");

const userInfoSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: UserModel,
			required: true
		},
		userType: {
			type: Number,
			required: true,
			min: 0,
			max: 6
		}, // Find Documenation below
		userTypeOther: {
			type: String,
			required: false
		},
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		login_mail: {
			type: String,
			required: true
		},
		mobile: {
			type: String,
			required: true
		},
		gender: {
			type: String,
			required: true,
			enum: ["M", "F", "O"]
		}, //Find Documenation below
		communities: [{
			type: String,
			required: true,
			enum: ["J", "Y", "M", "F", "U"]
		}], // Find Documenation below
		volunteers_skills:[ { type: String } ],
		volunteers_types:[{ type: Number,
							min:1,
							max:3 }],
		volunteers_availability:[{
			day: String,
			time_from:Number,
			time_to:Number

		}
		],
		resume_url: String,
		 state:String,
		 post_code:Number,
		 requests:[{
		request_for: Number,
		filtered_volunteers:[{ type:String }],
		interested_volunteers:[{ type:String }],
		final_volunteers:[{ type:String }]

		 }
			],
		initiatives: Object,
		profile: {
			facebook: String,
			twitter: String,
			linkedin: String,
			website: String,
			education: [{
				university_name: String,
				major: String,
				class: String,
				year_of_completion: Number,
				relevent_courses: [{ type: String }],
				achievements: [{ type: String }],
				extra_curriculars: [{ type: String }]
			}],
			work_experience: [{
				company: String,
				location: String,
				start_date: Date,
				end_date: Date,
				position: String,
				summary_of_responsibilities: String,
				achievements: [{ type: String }]
			}],
			current_employment_state: {
				type: String,
				enum: ["E", "S", "ST", "R"]
			}, // Find Documenation below
			industry: [{ type: String }]
		},
		community_connect: {
			skills: [{ type: String }],
			skills_to_learn: [{ type: String }],
			about_you: String,
			potential_matches: [{ type: String }]
		},

	},
	{
		timestamps: true
	}
);

class UserInfoModel extends DbConnection {
	static getSchema() {
		return mongoose.model("UserInfo", userInfoSchema);
	}
}

module.exports = {
	UserInfoModel
}

/**
 * userType
 * 0 - Other
 * 1 - Student with Disability
 * 2 - Volunteer Student
 * 3 - Volunteer Professional
 * 4 - Volunteer Other
 * 5 - HR
 * 6 - Admin
 */

/**
 * gender
 * M - Male
 * F - Female
 * O - Other
 */

 /**
  * communities
  * J  - Juniors
  * Y - Youth
  * M - Mentors
  * F - Friends
  * U - Updates
  */

  /**
   * current_employment_state
   * E - Employed
   * S - Seeking Employment
   * ST - Student
   * R - Retired
   */

   /**
   * volunteers_types
   *1-reader writer
   *2- sign language interpreter
   *3-tutor

   */
