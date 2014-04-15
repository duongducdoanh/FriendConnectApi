var like = require('../Models/LikeModel');
var article = require('../Models/ArticleModel');
var user = require("../models/UserModel");

module.exports.controller = function(app){
/*	Them yeu thich
	Lay danh sach nguoi yeu thich bai viet
	Lay danh sach nhung bai viet ma nguoi dung yeu thich
	Kiem tra da yeu thich bai viet chua
	Dem so nguoi yeu thich bai viet
	Xoa yeu thich mot bai viet
	*/

	/*  -----------------------------------------------------------------
	*   Add like
	*       - Input:
	*           + header: userId, auth_token
	*           + params: userId, articleId
	*       - Output:
	*           +   new like
	*   -----------------------------------------------------------------
	* */
	app.post('/api/likes/add_like.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    like.findOne({
                    	user_id: req.param('userId'),
                        article_id: req.param('articleId')
                    }, function(err, data) {
                        if (!err) {
                            if (!data) {
                                var _like = new Like();
                                _like.user_id = req.param('userId');
                                _like.article_id = req.param('articleId');
                                _like.save(function (err) {
                                    if (!err) {
                                        res.json({status_code: 200, message: '', data: 1});
                                    } else {
                                        res.json({status_code: 204, message: 'Yeu thich bai viet that bai', data: 0});
                                    }
                                });
                            } else
                                res.json({status_code: 204, message: 'Đã yêu thích bài viết', data: 0});
                        }
                        else{
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

	/*  -----------------------------------------------------------------
	*   Get like of article
	*       - Input:
	*           + header: userId, auth_token
	*           + param: articleId
	*       - Output:
	*           array<Like>
	*   -----------------------------------------------------------------
	* */

 	app.get('/api/likes/get_like.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    like.find({
                        article_id: req.param('articleId')
                    }, function(err, data){
                        if(!err) {
                            if (data) {
                                res.json({status_code: 200, message: '', data: data});
                            } else {
                                res.json({status_code: 204, message: 'Bai viet chua co yeu thich', data: {}});
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

	// Lay danh sach nhung bai viet ma nguoi dung yeu thich
    /*  -----------------------------------------------------------------
    *   Get all like of user
    *       - Input:
    *           + header: userId, auth_token
    *           + param: userId
    *       - Output:
    *               array<Like>
    *   -----------------------------------------------------------------
    * */

 	app.get('/api/likes/get_all_like_of_user.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    like.find({
                        user_id: req.param('userId')
                    }, function(err, data){
                        if(!err) {
                            if (data) {
                                res.json({status_code: 200, message: '', data: data});
                            } else if (!data) {
                                res.json({status_code: 204, message: 'Chua yeu thich bai viet', data: {}});
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

	// Kiem tra da yeu thich bai viet chua
    /*  -----------------------------------------------------------------
    *   Check Like
    *       - Input:
    *           + header: userId, auth_token
    *           + param: userId, articleId
    *       - Output:
    *           + 1: Da like, 0: chua like
    *
    *   -----------------------------------------------------------------
    * */
	app.get('/api/likes/check_like.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    like.findOne({
                        user_id: req.param('userId'),
                        article_id: req.param('articleId')
                    },function(err, data){
                        if(!err) {
                            if (data) {
                                res.json({status_code: 200, message: '', data: 1});
                            } else if (!data) {
                                res.json({status_code: 204, message: 'Chua yeu thich bai viet', data: 0});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data:0});
                        }
                    });
                  }else{
                    res.json({status_code: 404, message: 'auth_token is incorrect', data:0});
                }
            }else {
                res.json({status_code: 404, message: 'Sai userId', data: 0});
            }
        });
	});

	// Dem so nguoi yeu thich bai viet
    /*  -----------------------------------------------------------------
    *   Count like
    *       - Input:
    *           + header: userId, auth_token
    *           + param:    articleId
    *       - Output:
    *               number like
    *   -----------------------------------------------------------------
    * */

 	app.get('/api/likes/get_number_like.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    like.count({
                        article_id: req.param('articleId')
                    }, function(err, data){
                        if(!err) {
                            if (data) {
                                res.json({status_code: 200, message: '', data: data});
                            } else {
                                res.json({status_code: 204, message: 'Chua co yeu thich', data: 0});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data:{}});
                        }
                    });
                }else{
                    res.json({status_code: 204, message: 'auth_token is incorrect', data:{}});
                }
            }else {
                res.json({status_code: 404, message: 'Sai userId', data: {}});
            }
        });
	});

	// Xoa yeu thich mot bai viet
    /*  -----------------------------------------------------------------
    *   Unlike
    *       - Input:
    *           + header: userId, auth_token
    *           + param: userId, articleId
    *       - Output:
    *           + 1: success, 0: failure
    *   -----------------------------------------------------------------
    * */
	app.del('/api/likes/unlike.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    like.findOne({
                        user_id: req.param('userId'),
                        article_id: req.param('articleId')
                    }).remove(function(err, data){
                        if(!err) {
                            if (data) {
                                res.json({status_code: 200, message: '', data: data});
                            } else {
                                res.json({status_code: 204, message: 'Xoa yeu thich bai viet that bai', data: 0});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai param', data:0});
                        }
                    });
                }else{
                    res.json({status_code: 204, message: 'auth_token is incorrect', data:0});
                }
            }else {
                res.json({status_code: 404, message: 'Sai userId', data: 0});
            }
        });
	});

};