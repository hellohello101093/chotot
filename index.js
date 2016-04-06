var express = require("express");
var app     = express();
var path    = require("path");
var request    = require("request");
var cheerio    = require("cheerio");
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/ab',function(req,res){
  res.sendFile(path.join(__dirname + '/public/test.html'));
});

app.post('/check_post',function(req,res){
  var url = 'http://www.chotot.vn/'+req.body.link+'/mua-ban';
  var data = '';
  var res = res;
  request(url, function(err, response, body){  
    if (!err && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('.sprite_sunny_common_tick_verified').remove();
        $('.kasaco').remove();
        var html = $('.listing-rows').html();
        res.send(html);
    }
  })
  //res.sendFile(path.join(__dirname + '/public/test.html'));   
})

app.listen(3000);

console.log("Running at Port 3000");