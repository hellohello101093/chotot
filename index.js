var express = require("express");
var app     = express();
var path    = require("path");
var request    = require("request");
var cheerio    = require("cheerio");
var bodyParser = require('body-parser');
var json2csv = require('json2csv');
var fields = [
  'ad_id', 'post_time', 'post_date', 'phone', 'company',
  'subject', 'body', 'location', 'category', 'position',
  'platform', 'type', 'level', 'experience', 'education',
  'view', 'applied', 'expired_date'
];

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/ab',function(req,res){
  res.sendFile(path.join(__dirname + '/public/test.html'));
});

app.post('/check_post',function(req,res){
  var url = 'http://careerbuilder.com/jobs?page_number=1';
  var data = '';
  var res = res;
  request(url, function(err, response, body){
    if (!err && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var jobs = [];
        $('.job').each(function() {
          job = $(this).find('.job-title').text();
          jobs.push(job);
        });
        res.send(jobs.toString());
    }
    res.send(err);
  })
  //res.sendFile(path.join(__dirname + '/public/test.html'));
})

app.listen(3000);

console.log("Running at Port 3000");
