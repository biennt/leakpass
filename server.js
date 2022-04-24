var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var sha1 = require('./models/sha1');
var jssha1 = require('js-sha1');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var dbstring = process.env.DB || "mongodb://leakpass:matkhau@127.0.0.1/pwd";

mongoose.connect(dbstring, { useNewUrlParser: true, useUnifiedTopology: true });

var router = express.Router();

app.use('/api', router);

router.get('/raw/:rawpass', function(req, res){
var txtrawpass = req.params.rawpass;
var hash = jssha1.create();
var hashedpass = "";
if (txtrawpass.length > 0) {
  hash.update(txtrawpass);
  hashedpass = hash.hex().toUpperCase();
  sha1.findOne({ "hashpass": hashedpass }, function(err, sha1s ){
    if (err) {
      res.status(500).send('Unexpected error');
    } else {
      if (sha1s == null) {
        res.status(404).json({ count: 0});
      } else {
        res.json(sha1s);
      }
    }
    });  
} else {
  res.status(500).send('no password was provided');
}
});

router.get('/:hashedpass', function(req, res){
var txthashedpass = req.params.hashedpass.toUpperCase();
if (txthashedpass.length === 40) {
  sha1.findOne({ "hashpass": txthashedpass }, function(err, sha1s ){
    if (err) {
      console.log('Unexpected error. URI=' + req.url);
      res.status(500).send('Unexpected error');
    } else {
      if (sha1s == null) {
        res.status(404).json({ count: 0});
      } else {
        res.json(sha1s);
      }
    }
    });
} else {
  console.log('not a valid sha1 hash. URI=' + req.url);
  res.status(500).send(txthashedpass + ' is not a valid sha1 hash');
}
});

app.listen(port);
console.log('API server listening on port ' + port);

