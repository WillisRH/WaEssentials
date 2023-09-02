const mongoose = require("mongoose");

function checkDB(){
	try {
		mongoose.connect(process.env.DATABASE_MONGODB, { dbName: "WaEssentials" });
		console.log("connected to db");
	} catch (err) {
		console.log(`failed to connect to db : ${err}`);
	}
};

// schema
const schema = mongoose.Schema;
const messagedataSchema = new schema({
	databaseid: {
		type: Number,
	},
	username: {
		type: String,
	},
	phonenumber: {
		type: String,
	},
	isGroup: {
		type: Boolean,
	},
	groupName: {
		type: String,
	},
	message: {
		type: String,
	},
	isMedia: {
		type: Boolean
	},
	mediadata: {
		type: String
	},
	createdAt: {
		type: String,
	},
});

const userdataSchema = new schema({
	databaseid: {
		type: Number,
	},
	phonenumber: {
		type: String,
	},
	server: {
		type: String,
	},
	pushname: {
		type: String,
	},
	os: {
		type: String,
	},
	registeredAt: {
		type: String,
	},
});

const msgdb = mongoose.model("messagedata", messagedataSchema);
const userdb = mongoose.model("userdata", userdataSchema);

module.exports = {
	msgdb,
	userdb,
	checkDB,
};
