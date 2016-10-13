// modules =================================================
const express        = require('express');
const app            = express();
const dontenv 		 = require('dotenv');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const BreweryDb 	 = require('brewerydb-node');
const brewdb 		 = new BreweryDb('39a2a5c07029c99d88f9878f5d397c80');
// configuration ===========================================
const db = require('./server/db.js');
const favorite = require('./server/favorites/favoriteModel.js')

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/client')); // set the static files location /public/img will be /img for users

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 


app.get('/', function(req,res){
	res.sendfile(__dirname +'/client/index.html')
})

app.get('/favorites', function(req,res){
	favorite.find({}, (err,result)=>{
		if(err){
			console.log(err)
		}else{
			res.status(200).send(result)
		}
	})
})

app.post('/api/favorites',(req,res)=>{
	const search = req.body;
	favorite.findOne({favorites: search.favorites}, (err,data)=>{
		if(data === null){
			favorite.create(search,(err,result)=>{
				if(err){
					console.log(err)
				}else{
					res.status(200).send(result)
				}
			})
		}else{
			console.log('already in the database')
		}
	})
})

app.post('/', (req,res)=> {
	const search = req.body.search;
	brewdb.search.breweries({ q: search }, function(err,data){
		if(err){
			console.log(err);
		}else{
			res.send(data);
		}
	})

});
