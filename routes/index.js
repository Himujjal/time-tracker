var router = require('express').Router();
var modelsFunc = require('../models');

router.get('/', (req, res) => {
    var today = new Date();
    today = today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear() + "-" + today.getDay();
    modelsFunc.getRecordsByDate(today, function (err, records) {
        if (err) console.error('There was an error in fetching the records BY DATE');
        else {
            if(records){
                console.log(records);
                res.render('index', {
                    records: records
                });
            }    
            else res.render('index');       
        }
    })
})

router.get('/records', (req, res) => {
    modelsFunc.getAllRecords(function (err, records) {
        if (err) console.error('There was an error in fetching ALL the records ')
        else {
            console.log(records);
            res.render('records', {
                records: records
            });
        }
    })
})

router.post('/', (req, res) => {
    console.log(req.body);
    modelsFunc.addRecord(req.body, function (err, record) {
        if (err) console.error("There is an error in adding the record to the database")
        else {
            res.redirect('/')
        }
    })
})

module.exports = router