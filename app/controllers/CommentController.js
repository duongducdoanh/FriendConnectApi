var comment = require('../Models/CommentModel');
var user = require("../models/UserModel");

module.exports.controller = function(app){
/*	Them binh luan
	Lay binh luan theo ma bai viet
	Dem so binh luan cua bai viet
	Xoa binh luan
	Cap nhat binh luan
	*/

	/*  -----------------------------------------------------------------
	*   Add comment
	*       - Input:
	*           + header: userId, auth_token
	*           + body: comment
	*        Output:
	*           +   new comment
	*   -----------------------------------------------------------------
	* */
	app.post('/api/comments/add_comment.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    comment.find({
                        user_id: req.body.userId,
                        article_id: req.body.articleId
                    }, function(err, data){
                        if(!err){
                            if(data){
                                var ob = new comment(req.body);
                                ob.save(function (error){
                                    if(!error){
                                        res.json({status_code: 200, message: '', data: ob});
                                    } else{
                                        res.json({status_code: 204, message: 'Add comment is failure', data: {}});
                                    }
                                });
                            }else{
                                res.json({status_code: 204, message: 'Add comment is failure', data:{}});
                            }
                        }  else {
                            res.json({status_code: 404, message: 'Sai params', data:{}});
                        }
                    });
                }else{
                    res.json({status_code: 404, message: 'auth_token is incorrect', data:{}});
                }
            }else{
                res.json({status_code: 404, message: 'Sai usserId', data:{}});
            }
        });
	});

    /*  -----------------------------------------------------------------
     *   Get comment by articleId
     *       - Input:
     *           + header: userId, auth_token
     *           + param: articleId
     *        Output:
     *           +   array<comment>
     *  -----------------------------------------------------------------
     * */

 	app.get('/api/comments/get_comment_by_articleid.json', function(req, res){
		user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    comment.find({
                        article_id: req.param('articleId')
                    }, function(err, dataComment){
                        if(!err){
                            if(dataComment){
                                res.json({status_code: 200, message:'', data:dataComment});
                            }else{
                                res.json({status_code: 204, message:'Lay binh luan bai viet that bai', data:{}});
                            }
                        }else{
                            res.json({status_code: 404, message:'Sai param', data:{}});
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
     *   Count comment of a article
     *       - Input:
     *           + header: userId, auth_token
     *           + param: articleId
     *        Output:
     *           +   number comment
     *  -----------------------------------------------------------------
     * */

 	app.get('/api/comments/get_number_comment.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    comment.count({
                        article_id: req.param('articleId')
                    }, function(err, data){
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message:'', data:data});
                            }else{
                                res.json({status_code: 204, message:'Khong co binh luan', data:0});
                            }
                        }else{
                            res.json({status_code: 404, message:'Sai param', data:0});
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
     *   delete comment
     *       - Input:
     *           + header: userId, auth_token
     *           + param: commentId
     *        Output:
     *           +   1: success, 0: failure
     *  -----------------------------------------------------------------
     * */

 	app.del('/api/comments/delete_comment.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    comment.findOne({
                        _id: req.param('commentId')
                    }).remove(function(err, data){
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message:'', data:data});
                            }else{
                                res.json({status_code: 204, message: 'Delete comment is failure', data:0});
                            }
                        } else{
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
     *   Update comment
     *       - Input:
     *           + header: userId, auth_token
     *           + param: commentId
     *           + body: content comment
     *        Output:
     *           +   comment
     *  -----------------------------------------------------------------
     * */
	app.put('/api/comments/update_comment.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    comment.findByIdAndUpdate({
                        _id: req.param('commentId')
                    }, req.body, function(err, data){
                        if(!err) {
                            if (data) {
                                res.json({status_code: 200, message: '', data: data});
                            } else {
                                res.json({status_code: 204, message: 'Update comment is failure', data: {}});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data:{}});
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
};