var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var reportRouter = require('./routes/report');
var bodyParser = require('body-parser')
var http = require('http');
var app = express();
var port = 3000;
var server = http.createServer(app);
var cors = require('cors')

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/report', reportRouter);
app.use((req, res, next)=> {
  next(createError(404));
  res.setHeader('Content-Type', 'text/plain')
});
app.use((err, req, res, next)=> {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
app.set('port', port);
server.listen(port);
server.on('listening', ()=>{
  console.log(`Listening on port ${ server.address().port}`)
});
// var fs = require('fs');
// var text2png = require('text2png');
// var wrap = require('word-wrap');
// const a = wrap('Lorem ipsum dolor sit amet\nconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', {width: 30, indent: '      '})
// console.log(a)
// fs.writeFileSync('out.png', 
//   text2png(
//   a, {
//     font: '30px Futura',
//     color: 'purple',
//     backgroundColor: 'white',
//     lineSpacing: 10,
//     padding: 20
//   })
// );



module.exports = app;
