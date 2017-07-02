var path = require('path');

var express = require('express')
var port = process.env.PORT || 3000;

var app = express()

if ('development' === app.get('env')) {
    app.set('showStackError', true)
    // app.use(express.logger(':method :url :status'))
    app.locals.pretty = true
}

app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

require('./asset/router')(app)

app.listen(port);

console.log('server started on port ' + port);