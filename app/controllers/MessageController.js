var message = require('../Models/MessageModel');
var user = require("../models/UserModel");

module.exports.controller = function(app){
	// Tao tin nhan
	// Gui tin nhan
	// Lay danh sach tin nhan cua nguoi dung
	// Lay tin nhan theo id
	// Lay cac tin nhan moi
	// Lay danh sach cac tin nhan da nhan cua nguoi dung
	// Lay danh sach cac tin nhan da gui cua nguoi dung
	

    /*  -----------------------------------------------------------------
    *   Add Message
    *       - input:
    *           + header: userId, auth_token
    *           + body: message
    *       - output:
    *   -----------------------------------------------------------------
    * */

	app.post('/api/messages/save_message.json', function(req, res){

        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    var ob1 = new Message(req.body);
                    ob1.sender = req.header('userId');

                    ob1.save(function(err){
                        if(!err){
                            res.json({status_code: 200, message:'', data: ob1});
                        }else{
                            res.json({status_code: 204, message:'Gui tin nhan that bai', data: {}});
                        }
                    });

                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:{}});
            }
        });
	});
  /*  -----------------------------------------------------------------
    *   Lay tin nhan trong hop thu den
    *       - input:
    *           + header: userId, auth_token
    *           + params: 
    *       - output:
    *   -----------------------------------------------------------------
    * */

	app.get('/api/messages/get_message_inbox.json', function(req, res){

        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                 message.distinct('sender', {recipient: req.header('userId')}, function(err, data){
                 	if(!err){
                 		if(data){
                 			var response = new Array();
                 			for(var i=0; i<data.length; i++){
                 				var result = {sender: data[i]};
                 				response.push(result);
                 			}
                 			res.json({status_code: 200, message: '', data: response});
                 		}else{
                 			 res.json({status_code: 204, message: 'Không có tin nhắn', data:{}});
                 		}
                 	}else{
                 		 res.json({status_code: 404, message: 'Sai params', data:{}});
                 	}
                 });
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:{}});
            }
        });
     }); 


	  /*  -----------------------------------------------------------------
    *   Get Message theo ma cuoc tro chuyen
    *       - input:
    *           + header: userId, auth_token
    *           + params: chatId
    *       - output:
    *   -----------------------------------------------------------------
    * */

	app.get('/api/messages/get_message_by_chat_id.json', function(req, res){

        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                 	message.find({
                 		chat_id: req.param('chatId')
                 	}, function(err, dataMessage){
                 		if(!err){
                 			if(dataMessage){
                 				res.json({status_code: 200, message: '', data: dataMessage});
                 			}else{
                 				res.json({status_code: 204, message: 'Không có tin nhắn', data: {}});
                 			}
                 		}else{
                 			res.json({status_code:404, message: 'Sai params', data: {}});
                 		}
                 	});
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:{}});
            }
        });
     }); 


  /*  -----------------------------------------------------------------
    *   Lay tin nhan cua nguoi dung
    *       - input:
    *           + header: userId, auth_token
    *           + params:
    *       - output:
    *   -----------------------------------------------------------------
    * */

	app.get('/api/messages/get_message_recipient.json', function(req, res){

        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                 	message.find({
                 		recipient: req.header('userId')
                 	}, function(err, dataMessage){
                 		if(!err){
                 			if(dataMessage){
                 				res.json({status_code: 200, message: '', data: dataMessage});
                 			}else{
                 				res.json({status_code: 204, message: 'Không có tin nhắn', data: {}});
                 			}
                 		}else{
                 			res.json({status_code:404, message: 'Sai params', data: {}});
                 		}
                 	});
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:{}});
            }
        });
	});


  /*  -----------------------------------------------------------------
    *   Lay tin nhan den theo nguoi gui
    *       - input:
    *           + header: userId, auth_token
    *           + params: sender
    *       - output:
    *   -----------------------------------------------------------------
    * */

	app.get('/api/messages/get_message_sender.json', function(req, res){

        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                 	message.find({
                 		sender: req.param('sender')
                 	}, function(err, dataMessage){
                 		if(!err){
                 			if(dataMessage){
                 				res.json({status_code: 200, message: '', data: dataMessage});
                 			}else{
                 				res.json({status_code: 204, message: 'Không có tin nhắn', data: {}});
                 			}
                 		}else{
                 			res.json({status_code:404, message: 'Sai params', data: {}});
                 		}
                 	});
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:{}});
            }
        });
	});

  /*  -----------------------------------------------------------------
    *   Lay tin nhan moi nhat theo nguoi gui
    *       - input:
    *           + header: userId, auth_token
    *           + params: sender
    *       - output:
    *   -----------------------------------------------------------------
    * */

	app.get('/api/messages/get_last_message_sender.json', function(req, res){

        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                 	message.find({
                 		sender: req.param('sender')
                 	}, function(err, dataMessage){
                 		if(!err){
                 			if(dataMessage){
                 				res.json({status_code: 200, message: '', data: dataMessage[dataMessage.length-1]});
                 			}else{
                 				res.json({status_code: 204, message: 'Không có tin nhắn', data: {}});
                 			}
                 		}else{
                 			res.json({status_code:404, message: 'Sai params', data: {}});
                 		}
                 	});
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:{}});
            }
        });
	});
	
	  /*  -----------------------------------------------------------------
    *   Lay tin nhan da gui
    *       - input:
    *           + header: userId, auth_token
    *           + params:
    *       - output:
    *   -----------------------------------------------------------------
    * */

	app.get('/api/messages/get_message_sent.json', function(req, res){

        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                 	message.find({
                 		sender: req.header('userId')
                 	}, function(err, dataMessage){
                 		if(!err){
                 			if(dataMessage){
                 				res.json({status_code: 200, message: '', data: dataMessage});
                 			}else{
                 				res.json({status_code: 204, message: 'Không có tin nhắn', data: {}});
                 			}
                 		}else{
                 			res.json({status_code:404, message: 'Sai params', data: {}});
                 		}
                 	});
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:{}});
            }
        });
	});
	

	 /*  -----------------------------------------------------------------
    *   Lay tin nhan moi
    *       - input:
    *           + header: userId, auth_token
    *           + params:
    *       - output:
    *   -----------------------------------------------------------------
    * */

	app.get('/api/messages/get_new_message.json', function(req, res){

        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                 	message.find({
                 		recipient: req.param('recipientId'),
                 		status: false
                 	}, function(err, dataMessage){
                 		if(!err){
                 			if(dataMessage){
                 				res.json({status_code: 200, message: '', data: dataMessage});
                 			}else{
                 				res.json({status_code: 204, message: 'Không có tin nhắn mới', data: {}});
                 			}
                 		}else{
                 			res.json({status_code:404, message: 'Sai params', data: {}});
                 		}
                 	});
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:{}});
            }
        });
	});
	

		  /*  -----------------------------------------------------------------
    *   Lay tin nhan theo id
    *       - input:
    *           + header: userId, auth_token
    *           + params:
    *       - output:
    *   -----------------------------------------------------------------
    * */

	app.get('/api/messages/get_message_by_id.json', function(req, res){

        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                 	message.findOne({
                 		_id: req.param('messageId')
                 	}, function(err, dataMessage){
                 		if(!err){
                 			if(dataMessage){
                 				res.json({status_code: 200, message: '', data: dataMessage});
                 			}else{
                 				res.json({status_code: 204, message: 'Không có tin nhắn', data: {}});
                 			}
                 		}else{
                 			res.json({status_code:404, message: 'Sai params', data: {}});
                 		}
                 	});
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userId', data:{}});
            }
        });
	});
	

   /*  -----------------------------------------------------------------
     *   Xoa tin nhan theo id
     *       - input:
     *           + header: userId, auth_token
     *           + param: messageId
     *       - Output: 1: success, 0: failure
     *  -----------------------------------------------------------------
     * */
    app.del('/api/messages/remove_message.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    message.findOne({
                        _id: req.param('messageId')
                    }).remove(function(err, data){
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: 1});
                            }else{
                                res.json({status_code: 204, message: 'Xoa tin nhan that bai', data: 0});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: 0});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:0});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userID', data:0});
            }
        });
    });

   /*  -----------------------------------------------------------------
     *   Xoa cuoc tro chuyen
     *       - input:
     *           + header: userId, auth_token
     *           + param: messageId
     *       - Output: 1: success, 0: failure
     *  -----------------------------------------------------------------
     * */
    app.del('/api/messages/remove_message_by_chat_id.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    message.find({
                        chat_id: req.param('chatId')
                    }).remove(function(err, data){
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: 1});
                            }else{
                                res.json({status_code: 204, message: 'Xoa tin nhan that bai', data: 0});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: 0});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'Sai auth_token', data:0});
                }
            }else{
                res.json({status_code: 404, message: 'Sai userID', data:0});
            }
        });
    });

 /*  -----------------------------------------------------------------
     *   Cap nhat trang thai tin nhan
     *       - input:
     *           + header: userId, auth_token
     *           + body: messageId, status=true
     *       - Output:   message
     *  -----------------------------------------------------------------
     * */
	app.put('/api/messages/update_status_message.json', function(req, res){

        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    message.findOne({
                        _id: req.body.messageId
                    }, function(err, data){
                        if(!err){
                            if(data){
                            	var ob = data;
                            	ob.status = true;
                            	ob.receive_date = new Date();
                            	ob.save(function(err){
                            		if(!err){
                            			res.json({status_code: 200, message: '', data: 1});
                            		}else{
                            			res.json({status_code: 204, message: 'Luu cap nhat tin nhan that bai', data: 0});
                            		}
                            	});                                
                            }else{
                                res.json({status_code: 204, message: 'Cap nhat tin nhan that bai', data: 0});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: 0});
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

    /*  -----------------------------------------------------------------
     *   Count all message by sender
     *       - input:
     *           + header: userId, auth_token
     *           + param: sender
     *       - Output:   count article
     *  -----------------------------------------------------------------
     * */
	app.get('/api/messages/count_message_by_sender.json', function(req, res){
	    user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    message.count({
                        sender: req.param('sender')
                    }, function(err, data) {
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: data});
                            }else{
                                res.json({status_code: 204, message: 'Dem tong so tin nhan that bai', data: 0});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: 0});
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

    /*  -----------------------------------------------------------------
     *   Dem tin nhan theo nguoi nhan
     *       - input:
     *           + header: userId, auth_token
     *           + param: userId
     *       - Output:   count article
     *  -----------------------------------------------------------------
     * */
	app.get('/api/messages/count_message_by_recipient.json', function(req, res){
	    user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    message.count({
                       	recipient: req.header('userId')
                    }, function(err, data) {
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: data});
                            }else{
                                res.json({status_code: 204, message: 'Dem so tin nhan that bai', data: 0});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: 0});
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

};
