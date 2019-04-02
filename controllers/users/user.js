const { UserModel } = require("./../../models/user-model");
const { Authentication } = require("./../firebase/authentication");

const requiredKeys = ["email", "idtoken"];

class User {
  addUser(req, res) {
    requiredKeys.forEach((key) => {
      if (!req.headers[key]) {
        res.status(400).json({
          status: false,
          data: {
		  error: `${key} not found or found empty`
          }
        });
        return;
      }
    });

    let newUser = {};
    new Authentication().verifyIdToken(req.headers.idtoken)
      .then((user_data) => {
        if (user_data.email_verified === false) {
          return Promise.reject({
            status_code: 406,
            data: {
              error: "Account verification required"
            }
          });
        } else {
          var email=user_data.email;
          if(email.includes('chowgules')) {
          newUser = {
            email: user_data.email,
            userId: user_data.user_id,
            isAdmin: true
          };
        }else{
          newUser = {
            email: user_data.email,
            userId: user_data.user_id,
            isAdmin: false
        };
      }
          return UserModel.dbConnect();
        }
      })
      .then(() => {
        console.log("Db connected.");
        return UserModel.getSchema().findOne({ userId: newUser.userId }).exec();
      })
      .then((user_found) => {
        if (user_found) {
          return Promise.reject({
            status_code: 406,
            data: {
              error: "User already exist"
            }
          });
        } else {
          return UserModel.getSchema().create(newUser);
        }
      })
      .then((_user_data) => {
        console.log("User Saved.");
        res.status(201).json({
          status: true,
          data: {
            message: "User successfully created."
          }
        });
        return UserModel.dbDisconnect();
      })
      .then(() => {
        console.log("Connection closed");
      })
      .catch((err) => {
        console.log(err);

        if (err.status_code) {
          res.status(err.status_code).json({
            status: false,
            data: err.data
          });
        } else {
          res.status(400).json({
            status: false,
            data: {
              error: err.message || "Invalid auth token"
            }
          });
        }
        UserModel.dbDisconnect()
          .then(() => {
            console.log("Connection closed");
          });
      });
  }
}

module.exports = {
  User
}
