var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var sha1 = require('js-sha1');
var sha1 = require('./models/sha1');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var dbstring = process.env.DB || "mongodb://192.168.31.6:27017/pwd";

mongoose.connect(dbstring, { useNewUrlParser: true, useUnifiedTopology: true });

var router = express.Router();

app.use('/api', router);

router.get('/:hashedpass', function(req, res){
var txthashedpass = req.params.hashedpass.toUpperCase();
	sha1.findOne({ "hashpass": txthashedpass }, function(err, sha1s ){
		if (err) {
			console.log('Unexpected error. URI=' + req.url);
			res.status(500).send('Unexpected error');
		} else {
			if (sha1s == null) {
				console.log('Not found! URI=' + req.url);
				res.status(404).send('Not found');
			} else {
			    console.log('Found! URI=' + req.url);
			    res.json(sha1s);
		    }
		}
	});
});

app.listen(port);
console.log('API server listening on port ' + port);
