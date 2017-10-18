var mongoose = require('mongoose');

var RecordsSchema = mongoose.Schema({
        date: String,
        hours: Number,
        minutes: Number,
        seconds: Number,
        activity: String
});

var Records = mongoose.model('Records', RecordsSchema);

var getAllRecords = function(callback){
    Records.find(callback);
};

var addRecord = function(record, callback){
    Records.create(record, callback);
};

var getRecordsByDate = function(date, callback){
    var query = {date:date};
    Records.find(query, callback);
};

module.exports = {
    getAllRecords: getAllRecords,
    addRecord: addRecord,
    getRecordsByDate: getRecordsByDate 
};
