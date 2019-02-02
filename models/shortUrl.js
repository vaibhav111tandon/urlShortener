var mongoose = require('mongoose');
var schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrls');


const urlSchema = new schema({
    originalUrl: String,
    shortenUrl: String
},{timestamps: true});

module.exports = mongoose.model('shortUrl', urlSchema);