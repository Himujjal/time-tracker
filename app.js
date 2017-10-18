var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var exphbs = require('express-handlebars')


var app = module.exports = express()


var routes = require('./routes')

app.use(bodyParser.json())
app.set('views',path.join(__dirname, 'views/'))

var hbs = exphbs.create({
    helpers: {
        inc: function (i) { return i+1; },
    },
    defaultLayout: 'layout.hbs'
});
app.engine('hbs', hbs.engine)
app.set('view engine','hbs')

app.use(express.static(path.join(__dirname, 'assets')))
app.use('/', routes)


var db = mongoose.connect('mongodb://localhost/timeTracker',{useMongoClient:true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    console.log('Successfully Connected to the TimeTracker Local Database')
    //Start the Application
    var port = process.env.PORT || 1000
    app.listen(port, ()=>console.log(`Listening at port ${port}`))    
  
});


