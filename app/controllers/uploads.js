var im = require('imagemagick');
var fs = require('fs');
var user = require("../models/UserModel");

module.exports.controller = function(app){

	var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/uploads/uploadfile' enctype='multipart/form-data'>" +
"<input type='file' name='image'/>" +
"<input type='submit' /></form>" +
"</body></html>";

app.get('/', function (req, res){
	res.writeHead(200, {'Content-Type': 'text/html' });
	res.end(form);

});

/// Post files
app.post('/uploads/uploadfile', function(req, res) {
	user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
					fs.readFile(req.files.image.path, function (err, data) {

						var imageName = req.files.image.name

						/// If there's an error
						if(!imageName){
							console.log("There was an error")
							res.json({status_code: 404, message: 'have not file', data:{}});

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
								  }else
								  	console.log('resized image to fit within 200x200px');
								});

							  res.json({status_code: 200, message:'', data: {path: __dirname + "/public/uploads/" + imageName}});

						  });
						}
					});
                 }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userID', data:{}});
            }
        });
    });	


app.get('/uploads/get_file/:filename', function (req, res){
	user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
					filename = req.params.filename;
					res.json({status_code: 200, message:'', data: {path: __dirname + "/public/uploads/" + filename}});
                 }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userID', data:{}});
            }
        });
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
};