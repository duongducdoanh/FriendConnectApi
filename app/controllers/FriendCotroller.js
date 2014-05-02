var friend = require('../Models/FriendModel');
var user = require("../models/UserModel");

module.exports.controller = function(app){
/*	Them ban be 
	Lay danh sach ban be cua nguoi dung
	Kiem tra 2 nguoi dung da ket ban chua
	Dem so ban be cua nguoi dung
	Xoa ban be      -- Chua xong
	Lay danh sach nhung yeu cau ket ban cua nguoi dung
	Lay danh sach nhung yeu cau ket ban ma nguoi dung da gui di
	Dong y ket ban   -- Chua xong
	Khong dong y ket ban
	*/

   app.post('/api/friends/add_friend.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data){
                    user.findOne({
                        _id: req.body.userId2
                    }, function(err, data){
                        if(!err){
                            friend.findOne({
                                userA_friend: req.header('userId'),
                                userB_friend: req.body.userId2
                            }, function(err, data){
                                if(!err){
                                    if(!data){
                                        var _friend = new Friend();
                                        _friend.userA_friend = req.header('userId');
                                        _friend.userB_friend = req.body.userId2
                                        _friend.request = 1;
                                        _friend.save(function(err){
                                            if(!err){
                                                res.json({status_code: 200, message: 'Ket ban thanh cong', data: 1});
                                            }else{
                                                res.json({status_code: 204, message: 'Ket ban that bai', data: 0});
                                            }
                                        });
                                    }else{
                                        res.json({status_code: 204, message: 'Hai nguoi da ket ban', data: 0});
                                    }
                                }else{
                                    res.json({status_code: 204, message: 'Hai nguoi chua ket ban', data: 0});
                                }
                            })
                        }else{
                            res.json({status_code: 404, message: 'Sai userId2', data:0});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:0});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:0});
            }
        });
    });


	// Lay danh sach ban be cua nguoi dung
	app.get('/api/friends/get_friend.json', function(req, res){
        user.findOne({
           _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data){
                    friend.find({
                        userA_friend: req.header('userId'),
                        request: 0
                    }, function(err, data){
                        if(!err){
                            if(data){
                                res.json({status_code:200, message: '', data:data});
                            }else{
                                res.json({status_code:204, message: 'Người dùng chưa kết bạn', data:{}});
                            }
                        }else{
                            res.json({status_code: 404, message:'Lấy danh sách bạn bè thất bại', data:{}});
                        }
                    });
                }else{
                    res.json({status_code: 204, message: 'Sai auth_token', data:{}});
                }
            }else{
                res.json({status_code: 404, message:'Sai userId', data:{}});
            }
        });

	});

	// Kiem tra 2 nguoi dung da ket ban chua
	app.get('/api/friends/check_friend.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data){
                    friend.findOne({
                        userA_friend: req.header('userId'),
                        userB_friend: req.param('userId2'),
                        request: 0
                    }, function(err, data){
                        if(!err){
                            if(data) {
                                res.json({status_code: 200, message: '', data: 1});
                            }else{
                                res.json({status_code: 204, message: 'Hai nguoi chua la ban', data: 0});
                            }
                        }else{
                            res.json({status_code: 404, message:'params khong chinh xac', data:0});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:0});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:0});
            }
        });
	});

// Kiem tra yeu cau ket
    app.get('/api/friends/check_request_friend.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data){
                    friend.findOne({
                        userA_friend: req.header('userId'),
                        userB_friend: req.param('userId2')
                    }, function(err, data){
                        if(!err){
                            if(data) {
                                res.json({status_code: 200, message: '', data: 1});
                            }else{
                                res.json({status_code: 204, message: 'Hai nguoi chua la ban', data: 0});
                            }
                        }else{
                            res.json({status_code: 404, message:'params khong chinh xac', data:0});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:0});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:0});
            }
        });
    });


	// Dem so ban be cua nguoi dung
	app.get('/api/friends/count_friend.json', function(req, res){
        user.findOne({
           _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data){
                    friend.count({
                        userA_friend: req.header('userId'),
                        request: 0
                    }, function(err, data){
                       if(!err){
                           if(data){
                               res.json({status_code: 200, message: '', data: data});
                           }else{
                               res.json({status_code: 204, message: 'Chua ket ban', data: 0});
                           }
                       }else{
                           res.json({status_code: 404, message: 'params khong chinh xac', data: 0});
                       }
                    });
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data: 0});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data: 0});
            }
        });
	});

	// Xoa ban be
    /*
    *   Delete Friend
            - Input:
    *           + header: userId, auth_token
                +  param: userId2
    */          
	app.del('/api/friends/delete_friend.json', function(req, res){
         user.findOne({
           _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data){
                    friend.findOne({
                        userA_friend: req.header('userId'),
                        userB_friend: req.param('userId2')
                    }).remove(function(err, result){
                        if(!err){
                            if(result){
                                friend.findOne({
                                        userA_friend: req.param('userId2'),
                                        userB_friend: req.header('userId')
                                    }).remove(function(err, result){
                                        if(!err){
                                            if(data){
                                                res.json({status_code: 200, message: '', data: 1});
                                            }else{
                                                res.json({status_code: 204, message: 'Xoa ban be that bai', data: 0});
                                            }
                                        }else{
                                            res.json({status_code: 204, message: 'Sai param 2', data: 0});
                                        }                                        
                                });
                            }else{
                                res.json({status_code: 204, message: 'Xoa ban be that bai', data: 0});
                            }
                        }else{
                            res.json({status_code: 204, message: 'Sai params 1', data: 0});
                        }
                     });                  
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data: 0});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data: 0});
            }
        });	
	});

	// Lay danh sach nhung yeu cau ket ban cua nguoi dung
	app.get('/api/friends/get_list_request.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data){
                    friend.find({
                        userB_friend: req.header('userId'),
                        request: 1
                    }, function(err, data){
                      if(!err){
                          if(data){
                              res.json({status_code: 200, message: '', data: data});
                          }else{
                              res.json({status_code: 204, message: 'Khong co yeu cau ket ban', data:{}});
                          }
                      }else{
                          res.json({status_code: 404, message: 'Sai params', data: {}});
                      }
                    });
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token'+ err, data: {}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai UserId', data: {}});
            }
        });
	});


	// Lay danh sach nhung yeu cau ket ban ma nguoi dung da gui di
	app.get('/api/friends/get_list_requested.json', function(req, res){
        user.findOne({
            _id:req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data){
                    friend.find({
                        userA_friend: req.header('userId'),
                        request: 1
                    }, function(err, data){
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: data});
                            }else{
                                res.json({status_code: 204, message: 'Chua gui yeu cau ket ban', data:{}});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: {}});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data: {}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai UserId', data: {}});
            }
        });
	});

	// Dong y ket ban
	app.post('/api/friends/agree_add_friend.json', function(req, res){
        user.findOne({
            _id:req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data){
                    friend.findOne({
                        _id: req.body.friendId,
                        request: 1
                    }, function(err, data){
                        if(!err){
                            if(data){
                                friend.findByIdAndUpdate({
                                    _id: req.body.friendId
                                }, req.body, function(err, data){
                                    if(!err) {
                                        if (data) {  
                                                                   ;
                                           var new_friend = new Friend();
                                            new_friend.userA_friend = data.userB_friend;
                                            new_friend.userB_friend = data.userA_friend;
                                            new_friend.request = 0;

                                            new_friend.save(function (err) {
                                                if (err) {
                                                    res.json({status_code: 404, message: 'Save new friend not successful', data: 0});
                                                } else {
                                                    res.json({status_code: 200, message: '', data: 1});
                                                }
                                            });

                                        } else
                                            res.json({status_code: 204, message: 'Dong y ket ban that bai', data: 0});
                                    }else{
                                        res.json({status_code: 404, message: 'Sai param', data:0});
                                    }
                                });
                            }else{
                                res.json({status_code: 204, message: 'Hai nguoi da la ban', data: 0});
                            }
                        }else{
                             res.json({status_code: 204, message: 'Sai friendId', data: 0});
                        }
                    });                    
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data: 0});
                }
            }else{
                res.json({status_code: 404, message: 'Sai UserId', data: ''});
            }
        });
	});

	// Khong dong y ket ban
	app.del('/api/friends/disagree_add_friend.json', function(req, res){
        user.findOne({
            _id:req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data){
                    friend.findOne({
                        _id: req.param('friendId')
                    }).remove(function(err, data){
                       if(!err){
                           if(data){
                               res.json({status_code: 200, message: '', data: 1});
                           }else{
                               res.json({status_code: 204, message: 'Huy ket ban that bai', data: 0});
                           }
                       }else{
                           res.json({status_code: 404, message: 'Sai params', data: {}});
                       }
                    });
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data: {}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai UserId', data: {}});
            }
        });
	});
    
};