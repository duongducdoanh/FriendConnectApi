
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config')();

// Doc file truy cap thu muc
var fs = require('fs');
var mongo = require('mongoose');
mongo.connect('mongodb://'+ config.db.host + '/'+ config.db.name);
var app = express();
/// Include ImageMagick
var im = require('imagemagick');
//=========================================//
var multer = require('multer');
app.use(multer({ dest: './public/uploads' }));

//===========================================//

// all environments
app.set('port', config.port);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Load tat ca cac file js trong thu muc controllers
fs.readdirSync('./app/controllers').forEach(function (file) {
    if (file.substr(-3) == '.js') {
        route = require('./app/controllers/' + file);
        route.controller(app);
    }
});

// Cho phep cac don vi ben ngoai truy xuat lay du lieu
app.all('*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


//========================================================================//


/// Include the express body parser
app.configure(function () {
	app.use(express.methodOverride());
	app.use(express.bodyParser());
});

/*
var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/upload' enctype='multipart/form-data'>" +
"<input type='file' name='image'/>" +
"<input type='submit' /></form>" +
"</body></html>";

app.get('/', function (req, res){
	res.writeHead(200, {'Content-Type': 'text/html' });
	res.end(form);

});

/// Post files
app.post('/upload', function(req, res) {

	fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {

		   var newPath = __dirname + "/uploads/fullsize/" + imageName;

		  var thumbPath = __dirname + "/uploads/thumbs/" + imageName;

		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {

		  	/// write file to uploads/thumbs folder
			  im.resize({
				  	srcPath: newPath,
				  	dstPath: thumbPath,
					width: 120, height: 80
				}, function(err, stdout, stderr){
				  if (err) {
				  	console.log('can not resize image');
				  }
				  console.log('resized image to fit within 200x200px');
				});

			   res.redirect("/uploads/get_file/" + imageName);

		  });
		}
	});
});

app.get('/uploads/get_file/:filename', function (req, res){
	filename = req.params.filename;
	res.json({status_code: 200, message:'', data: {path: __dirname + "/public/uploads/fullsize/" + filename}});
});

/// Show files
app.get('/uploads/fullsize/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/public/uploads/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});

app.get('/uploads/thumbs/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/uploads/thumbs/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});

app.get('/info', function(req, res){
	console.log(__dirname);
	res.send("ok");
});
*/

//=======================================================================//


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
