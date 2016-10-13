const mongoose = require('mongoose');
const moment   = require('moment');
const dotenv   = require('dotenv')


//username process.env.DB_USER //password process.env.DB_PASS
const dbURL = 'mongodb://chris:chris@ds053156.mlab.com:53156/mvpphan' ;

const db = mongoose.connection;
mongoose.connect(dbURL);

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open',function(){
	 console.log('[' + moment().format('hh:mm:ss') + ']' + ' Database connection established');
});

module.export = db;
