const { DbConnection } = require("../config/database/db_connection");
const { UserModel } = require("./user-model");
const { UserInfoModel } = require("./user-info-model");

async function query(userId){
	let res = await UserInfoModel.getSchema().findOne({ userId: userId}).exec();
	return res;
}
		 
async function getData(userId){
	DbConnection.dbConnect().then((res)=>{
	console.log('db connected');
}).catch((err)=>{
	console.log('db connection problem');
});
let result = await query(userId);	
return result;
}

module.exports = {
getData
};

 