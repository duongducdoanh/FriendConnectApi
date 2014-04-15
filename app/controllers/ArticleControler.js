var article = require('../Models/ArticleModel');
var user = require("../models/UserModel");
var follow = require('../Models/FollowModel');
var like = require('../Models/LikeModel');
var comment = require('../Models/CommentModel');


module.exports.controller = function(app){
	/*
		Them bai viet
		Lay nhung bai viet cua nhung nguoi dang theo doi
		Lay bai viet theo id
		Lay bai viet theo userid
		Lay bai viet moi nhat co anh
		Dem so bai viet cua nguoi dung
		Dem so bai viet co anh cua nguoi dung
		Xoa bai viet
		Cap nhat bai viet
	*/

    /*  -----------------------------------------------------------------
    *   Add Article
    *       - input:
    *           + header: userId, auth_token
    *           + body: article
    *       - output:
    *   -----------------------------------------------------------------
    * */

	app.post('/api/articles/add_article.json', function(req, res){

        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    var ob = new Article(req.body);

                    ob.save(function(err){
                        if(!err){
                            res.json({status_code: 200, message:'', data: ob});
                        }else{
                            res.json({status_code: 204, message:'Them bai viet that bai', data: {}});
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

	// Lay nhung bai viet cua nhung nguoi dang theo doi
	/*
        Get Article Following
        - input:
            + Header: userId, auth_token
            + param: userId
        - output: 
            + List<Article>

    */
	app.get('/api/articles/get_article_following.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    follow.find({
                        userA_follow: req.param('userId')
                    }, function(err, data){
                        if(!err){
                            if(data){
                                article.findOne({
                                    poster: data.userB_follow
                                }, function(err, data){
                                   if(!err){
                                       if(data){
                                           res.json({status_code: 200, message:'', data: data});
                                       }else{
                                           res.json({status_code: 204, message: 'Lay bai viet cua nhung nguoi dang quan tam that bai', data: {}});
                                       }
                                   } else{
                                       res.json({status_code: 404, message: 'Sai ma nguoi dung', data: {}});
                                   }
                                });
                            }else{
                                res.json({status_code: 204, message: 'Lay danh sach nguoi quan tam that bai', data: {}});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: {}});
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
    *   Get article by id
    *       - input:
    *           + header: userId, auth_token
    *           + param: articleId
    *       - Output:   a Article
    *   -----------------------------------------------------------------
    * */

    app.get('/api/articles/get_article_by_id.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    // Lay bai viet
                    article.findOne({
                        _id: req.param('articleId')
                    }, function(err, dataArticle){
                        if(!err){
                            if(dataArticle){
                                res.json({status_code: 200, message: '', data: dataArticle});
                            }else{
                                res.json({status_code: 204, message: 'Lay bai viet theo ma bai viet that bai', data: {}});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: {}});
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

    app.get('/api/articles/get_article_by_id_2.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    // Lay bai viet
                    article.findOne({
                        _id: req.param('articleId')
                    }, function(err, dataArticle){
                        if(!err){
                            if(dataArticle){

                                // Lay du lieu nguoi dang bai viet
                                user.findOne({
                                    _id: dataArticle.poster
                                }, function(err, dataPoster){
                                    if(!err){
                                        if(dataPoster) {
                                            var _poster = {_id: dataPoster._id, username: dataPoster.username,
                                                avatar: dataPoster.avatar, online: dataPoster.online};

                                            // Lay du lieu yeu thich bai viet
                                            var numberLike;
                                            like.find({
                                                article_id: req.param('articleId')
                                            }, function (err, datalike) {
                                                if (!err) {
                                                    if (datalike) {
                                                        // Lay du lieu binh luan
                                                        comment.find({
                                                            article_id: req.param('articleId')
                                                        }, function (err, dataComment) {
                                                            if (!err) {
                                                                if (dataComment) {
                                                                    res.json({status_code: 200, message: '', data: {_id: dataArticle._id, poster: _poster, content: dataArticle.content,
                                                                        like: datalike, comment: dataComment}});
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }else{
                                res.json({status_code: 204, message: 'Lay bai viet theo ma bai viet that bai', data: {}});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: {}});
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
    *   Get article by userID
    *       - input:
    *           + header: userId, auth_token
    *           + param: userId
    *       - Output:   Array<Article>
    *   -----------------------------------------------------------------
    * */


 	app.get('/api/articles/get_article_by_userid.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    article.find({
                        poster: req.param('userId')
                    }, function(err, dataArticle){
                        if(!err){
                            if(dataArticle){
                               res.json({status_code: 200, message:'', data: dataArticle});

                            }else{
                                res.json({status_code: 204, message: 'Lay bai viet theo ma nguoi dung that bai', data: {}});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: {}});
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
     *   Get new article have image
     *       - input:
     *           + header: userId, auth_token
     *           + param: userId
     *       - Output:   Array<Article>
     *  -----------------------------------------------------------------
     * */

 	app.get('/api/articles/get_new_article_have_image.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    article.find({
                        poster: req.param('userId'),
                        url_image: { $ne: ''}
                    }, function(err, data) {
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: data});
                            }else{
                                res.json({status_code: 204, message: 'Lay bai viet moi nhat co anh that bai', data: {}});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: {}});
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
     *   Count article
     *       - input:
     *           + header: userId, auth_token
     *           + param: userId
     *       - Output:   count article
     *  -----------------------------------------------------------------
     * */
	app.get('/api/articles/count_article.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    article.count({
                        poster: req.param('userId')
                    }, function(err, data) {
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: data});
                            }else{
                                res.json({status_code: 204, message: 'Dem so bai viet that bai', data: 0});
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
     *   Count total article have image
     *       - input:
     *           + header: userId, auth_token
     *           + param: userId
     *       - Output:   count article
     *  -----------------------------------------------------------------
     * */
	app.get('/api/articles/count_total_image.json', function(req, res){
	    user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    article.count({
                        poster: req.param('userId'),
                        url_image: {$ne : ''}
                    }, function(err, data) {
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: data});
                            }else{
                                res.json({status_code: 204, message: 'Dem tong so anh that bai', data: 0});
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
     *   Remove article
     *       - input:
     *           + header: userId, auth_token
     *           + param: articleId
     *       - Output: 1: success, 0: failure
     *  -----------------------------------------------------------------
     * */
	app.del('/api/articles/delete_article.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    article.findOne({
                        _id: req.param('articleId')
                    }).remove(function(err, data){
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: data});
                            }else{
                                res.json({status_code: 204, message: 'Xoa bai viet that bai', data: 0});
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
     *   Update article
     *       - input:
     *           + header: userId, auth_token
     *           + body: article
     *       - Output:   article
     *  -----------------------------------------------------------------
     * */
	app.put('/api/articles/update_article.json', function(req, res){

        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    article.findByIdAndUpdate({
                        _id: req.body.articleId
                    }, req.body, function(err, data){
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: data});
                            }else{
                                res.json({status_code: 204, message: 'Cap nhat bai viet that bai', data: {}});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: {}});
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

};