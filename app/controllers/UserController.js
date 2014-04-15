
var user = require("../models/UserModel");

/*-----------------------------------------------------------------*/
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "it4992.ltt@gmail.com",
        pass: "matkhau123"
    }
});

 var mailOptions = {
                    from: "FriendConnect ✔ <it4992.ltt@gmail.com>", // sender address
                    to: "duongducdoanh@gmail.com", // list of receivers
                    subject: "Friend Connect - Khôi phục mật khẩu", // Subject line
                    text: "Mật khẩu mới của bạn là:  ✔", // plaintext body
                    html: "<b>Hello world ✔</b>" // html body
                }
/*-----------------------------------------------------------------*/

/*-----------------------------------------------------------------*/
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

// random auth_token
var crypto = require('crypto');

function random (char) {
    howMany =   randomInt(10, 15);
    chars = char
        || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    var rnd = crypto.randomBytes(howMany)
        , value = new Array(howMany)
        , len = chars.length;

    for (var i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len]
    };

    return value.join('');
}

/*-----------------------------------------------------------------*/
// Cau hinh routes
module.exports.controller = function(app) {

	// Dang nhap
	// Dang ky
	// Lay danh sach tat ca nguoi dung
	// Lay nguoi dung theo Id
	// Lay nguoi dung theo username
	// Cap nhat thong tin nguoi dung
	// Thay doi mat khau nguoi dung
	// Quen  mat khau
	/*


	*/


    /*  -----------------------------------------------------------------
    *  Login
    *  input: username, password
    *  output: user
    *   -----------------------------------------------------------------
    * */

    app.put('/api/users/login.json', function(req, res) {
        user.findOne({
            username: req.param('username'),
            password: req.param('password')
        }, function (err, result) {
            if (!err) {
                if (result) {
                    var _user = result;
                    _user.auth_token = random();
                    _user.online = true;
                    _user.save(function (error) {
                        if (!error) {
                            res.json({status_code: 200, message: '', data: _user});
                        } else {
                            res.json({status_code: 404, message: 'Save user not successful', data: {}});
                        }
                    });
                } else{
                    res.json({status_code: 404, message: 'Sai tên đăng nhập hoặc mật khẩu', data: {}});
                }
            } else {
                res.json({status_code: 404, message: 'Sai params', data: {}});
            }
        });
    });

/*
    Logout
     - Input:
        + Header: userId, auth_token
*/

app.put('/api/users/logout.json', function(req, res) {
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function (err, result) {
            if (!err) {
                if (result) {
                    var _user = result;
                    _user.online = false;
                    _user.save(function (error) {
                        if (!error) {
                            res.json({status_code: 200, message: '', data: _user});
                        } else {
                            res.json({status_code: 404, message: 'Save user not successful', data: {}});
                        }
                    });
                } else{
                    res.json({status_code: 404, message: 'Save user not successful', data: {}});
                }
            } else {
                res.json({status_code: 404, message: 'Sai params', data: {}});
            }
        });
    });

    
    /*  -----------------------------------------------------------------
     *   Register
     *       - Input:
     *           +  header:  id, auth_token
     *           +  body:   username
     *       - Output:
     *           data of User
     *  -----------------------------------------------------------------
     * */

    app.post('/api/users/register.json', function(req, res){      

		user.findOne({
			username: req.body.username
		}, function(err, data){
			if(!err){
				if(data){
					res.json({status_code: 404, message: "Ten dang nhap da ton tai", data:{}});
				}else{
					user.findOne({
						email:req.body.email
					}, function(err, data){
						if(!err){
							if(data)
								res.json({status_code: 404, message:"Email da duoc dang ky", data:{}});
							else{
								var new_user = new User(req.body);
                        		new_user.auth_token = random();
                        		new_user.online = true;

		                        new_user.save(function (error) {
		                            if (error) {
		                                res.json({status_code: 404, message: 'Save user not successful', data: {}});
		                            } else {
		                                res.json({status_code: 200, message: '', data: new_user});
		                            }
		                        });
							}
						}else{
							res.json({status_code: 404, message:"Loi dang ky tai khoan", data:{}});
						}
					});
				}
			}else{
				res.json({status_code: 404, message:"Loi dang ky tai khoan", data:{}});
			}
		});
    });


    /*  -----------------------------------------------------------------
     *   Get all user
     *       - Input:
     *           +  header:  userId, auth_token
     *       - Output:
     *           data of all User
     *  -----------------------------------------------------------------
     * */

     app.get('/api/users/get_all_user.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    user.find({}, function (err, data) {
                        if (data) {

                            var response = new Array()
                            for(var i=0; i< data.length; i++) {
                                var result = {_id: data[i]._id, username: data[i].username, email: data[i].email,
                                    fullname: data[i].fullname, avatar: data[i].avatar, cover: data[i].cover,
                                    status: data[i].status, address: data[i].address, phone: data[i].phone,
                                    birthday: data[i].birthday, gender: data[i].gender,
                                    online: data[i].online, join_date: data[i].join_date};
                                response.push(result);
                            }

                            res.json({status_code: 200, message: '', data: response});
                        } else if (!data1) {
                            res.json({status_code: 404, message: 'Have not user', data: {}});
                        } else {
                            res.json({status_code: 404, message: err, data: {}});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'auth_token is incorrect', data:{}});
                }
            }else{
                res.json({status_code: 404, message: err, data:{}});
            }
        });
    });

    /*  -----------------------------------------------------------------
     *   Get User By Id
     *       - Input:
     *           +  header:  userId, auth_token
     *           +  param:   userId
     *       - Output:
     *           data of User
     *  -----------------------------------------------------------------
     * */
    app.get('/api/users/get_user_by_id.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    user.findOne({
                        _id: req.param('userId')
                    }, function(err, data){
                        if(!err){
                            if(data) {
                                var result = {_id: data._id, username: data.username, email: data.email,
                                    fullname: data.fullname, avatar: data.avatar, cover: data.cover,
                                    status: data.status, address: data.address
                                    , phone: data.phone, birthday: data.birthday, gender: data.gender,
                                    online: data.online, join_date: data.join_date};

                                res.json({status_code: 200, message: '', data: result});
                            }else
                                res.json({status_code: 204, message: 'user is not exited', data:{}});
                        }else{
                            res.json({status_code: 404, message: 'Sai param', data:{}});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'auth_token is incorrect', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:{}});
            }
        });
    });

    app.get('/api/users/get_user_normal.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data){
                    user.findOne({
                        _id: req.param('userId')
                    }, function(err, data){
                        if(!err){
                            if(data){
                                var result = {_id: data._id, username: data.username, avatar: data.avatar,
                                status: data.status, online: data.online};

                                res.json({status_code: 200, message: '', data: result});
                           }else
                                res.json({status_code: 204, message: 'user is not exited', data:{}});
                        }else{
                            res.json({status_code: 404, message: 'Sai param', data:{}});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'auth_token is incorrect', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:{}});
            }
        });
    });

    /*  -----------------------------------------------------------------
    *   Get User By Username
    *       - Input:
    *           +  header:  userId, auth_token
    *           +  param:   username
    *       - Output:
    *           data of User
    *   -----------------------------------------------------------------
    * */
    app.get('/api/users/get_user_by_name.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    user.findOne({
                        username: req.param('username')
                    }, function(err, data){
                        if(data) {
                            var result = {_id: data._id, username: data.username, email: data.email,
                                fullname: data.fullname, avatar: data.avatar, cover: data.cover,  status: data.status,address: data.address
                                , phone: data.phone, birthday: data.birthday, gender: data.gender,
                                online: data.online, join_date: data.join_date};

                            res.json({status_code: 200, message: '', data: result});
                        }else if(!data)
                            res.json({status_code: 404, message: 'user is not exited', data:{}});
                        else if(err){
                            res.json({status_code: 404, message: err, data:{}});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'auth_token is incorrect', data:{}});
                }
            }else{
                res.json({status_code: 404, message: err, data:{}});
            }
        });
    });


    /*  -----------------------------------------------------------------
    *   Update information
    *       - Input:
    *           + header:   userId, auth_token
    *           + body:     info user
    *       - Output:   data of user
    *   -----------------------------------------------------------------
    * */
    app.put('/api/users/update_info.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    user.findByIdAndUpdate({
                        _id: req.header('userId')
                    }, req.body, function(err, data){
                        if(!err) {
                            if (data) {
                                res.json({status_code: 200, message: '', data: data});
                            } else
                                res.json({status_code: 204, message: 'user is not exited', data: {}});
                        }else{
                            res.json({status_code: 404, message: 'Sai param', data:{}});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'auth_token is incorrect', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:{}});
            }
        });
    });


    /*  -----------------------------------------------------------------
    * Update password
    * - input:
    *       + header: userId, auth_token
    *       + body:  password
    * - Output: data of user
    *   -----------------------------------------------------------------
    * */

     app.put('/api/users/update_password.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    user.findByIdAndUpdate({
                        _id: req.header('userId')
                    }, req.body, function(err, data){
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: data});
                            }else
                                res.json({status_code: 404, message: 'update password not successful', data: ''});
                        }else{
                            res.json({status_code: 404, message: 'Sai param', data:{}});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'auth_token is incorrect', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:{}});
            }
        });
    });

    /*  -----------------------------------------------------------------
    *   Forget Password
    *   - Input:
    *       + param:    email
    *   -----------------------------------------------------------------
    * */
    app.put('/api/users/forget_pass.json', function(req, res){
        user.findOne({
            email: req.param('email')
        }, function (err, result) {
            if (!err) {
                if (result) {
                    var newPassword = random();

                    mailOptions.text = "Mật khẩu mới của bạn là: "+ newPassword;
                    mailOptions.html = "<b>"+mailOptions.text+"</b>";

                    var _user = result;
                    _user.password = newPassword;

                    _user.save(function (error) {
                        if (!error) {
                          //  res.json({status: 200, message: '', data: _user});
                            smtpTransport.sendMail(mailOptions, function(error, response){
                                if(error){
                                    res.json({status_code: 404, message: 'Error', data:0});
                                    console.log(error);
                                }else{
                                    res.json({status_code: 200, message: "Message sent: "+ response.message, data: 1});
                                    console.log("Message sent: " + response.message);
                                }
                            });
                        } else {
                            res.json({status_code: 404, message: 'Save user not successful', data: {}});
                        }
                    });
                } else if (!result) {
                    res.json({status_code: 404, message: 'Email incorrect', data: {}});
                }
            } else {
                res.json({status_code: 404, message: 'Sai param', data: {}});
            }
        });
    });


        /*  -----------------------------------------------------------------
    *   Get Location
    * - input:
    *       + header: userId, auth_token
    
    * - Output: longitude, latitude
    *   -----------------------------------------------------------------
    * */
    app.get('/api/users/get_location.json', function(req, res){
        user.findOne({
           _id:req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data){
                    res.json({status_code: 200, message: '', data: {longitude: data.longitude, latitude: data.latitude}});
                }else{
                    res.json({status_code: 204, message: 'Sai param', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai UserId', data: {}});
            }
        });
    });

        /*  -----------------------------------------------------------------
    * Update location
    * - input:
    *       + header: userId, auth_token
    *       + body:  longitude, latitude
    * - Output: data of user
    *   -----------------------------------------------------------------
    * */

     app.put('/api/users/update_location.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    user.findByIdAndUpdate({
                        _id: req.header('userId')
                    }, req.body, function(err, data){
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: 1});
                            }else
                                res.json({status_code: 404, message: 'update location not successful', data: 0});
                        }else{
                            res.json({status_code: 404, message: 'Sai param', data:0});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'auth_token is incorrect', data:0});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:0});
            }
        });
    });
    
};