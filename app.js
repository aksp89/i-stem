if (process.env.NODE_ENV !== 'production') {
require('dotenv').load();
}
const express = require("express");
var session = require('express-session');
//var AzureTablesStoreFactory = require('connect-azuretables')(session);
var https=require('https');
var cookieParser = require('cookie-parser');

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

var hbs = require('hbs');
var path=require('path');
const bodyParser = require("body-parser");
var path = require('path');
var profile=require("./routes/profile-routes");
global.appRoot = path.resolve(__dirname);

//
// Import all routes
let { UserRoutes } = require("./routes/user-routes");
let { NewsFeedRoutes } = require("./routes/news-feed-routes");
let { EventRoutes } = require("./routes/event-routes");
let { passwordroutes }=require("./routes/pass-auth-routes");
//let { router } =require("./controllers/firebase/authentication");
const {EmailRoutes} = require('./routes/email-routes');
let {VolunteerRoutes} = require('./routes/volunteer-routes');
const {FileUploadRoutes} = require('./routes/file-upload-routes');

const upload_math = require('./routes/upload-math');
const upload_video = require('./routes/upload-video')
//Set up express



const app = express();

//Middleware for body-parser
app.use(cookieParser());
//var options = {storageAccount: process.env.AccountName, accessKey: process.env.AccountKey,sessionTimeOut: 60*24};
app.use(session({
		secret:"I-stem app",
		resave: true,
    saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('views', path.join(__dirname, '/public'));
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine','html');
app.engine('html', require('hbs').__express);
//app.set('view engine', 'jade');
app.use("/", new VolunteerRoutes().router);
app.use("/", new EmailRoutes().router);
app.use('/uploadVideo', upload_video);
app.use('/upload', upload_math)
app.use('/', new FileUploadRoutes().router);


app.use("/",profile);

//Middleware for routes
app.use("/user", new UserRoutes().router);
app.use("/news", new NewsFeedRoutes().router);
app.use("/event", new EventRoutes().router);
app.use("/password-authentication",new passwordroutes().router);




//Listen to port
let port = process.env.port || 3000;
app.listen(port, () => {
	console.log(`App is running on port ${port}.`);
});
