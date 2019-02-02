var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var shortUrl = require('./models/shortUrl');
var validUrl = require('valid-url');
var shortid = require('shortid');

app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrls');

app.use(express.static(__dirname + '/public'));

app.get('/new/:urlToShorten(*)', (req, res, next)=>{
    var { urlToShorten } = req.params;
    if(validUrl.isUri(urlToShorten)){
        var shortCode = shortid.generate();

        var data = new shortUrl({
            originalUrl: urlToShorten,
            shortenUrl: shortCode
        });
        data.save(err=>{
            if(err){
                res.send("Error while saving to the database");
            }
        });

        res.json(data);
    }else{
        var data = new shortUrl({
            originalUrl: urlToShorten,
            shortenUrl: 'Invalid Url'
        });
        res.json(data);
    }
    return res.status(200).json({urlToShorten});
});

app.get('/:urlToForward', (req, res, next) => {
    var shorterUrl = req.params.urlToForward;
    shortUrl.findOne({'shortenUrl': shorterUrl}, (err, data)=>{
        if(err) return res.send("Error reading database");
        var checkUrl = data.originalUrl;
        if(validUrl.isUri(checkUrl)){
            res.redirect(301, data.originalUrl);
        }
    });
});

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("Everything is working fine");
});