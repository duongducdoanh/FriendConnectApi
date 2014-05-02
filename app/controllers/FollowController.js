var follow = require('../Models/FollowModel');
var user = require('../models/UserModel');

module.exports.controller = function(app){
    // Them quan tam
    // Lay danh sach nhung nguoi quan tam cua nguoi dung
    // Dem so nguoi quan tam
    // Xoa quan tam

    /*
    *   Add Follow
    *       + input:
    *           - header: userId, auth_token
    *           - param: userId
    *       + output:
    *           - new follow
    * */
    app.post('/api/follows/add_follow.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
           if(!err){
               if(data){
                   follow.findOne({
                      userA_follow: req.header('userId'),
                       userB_follow: req.param('userId')
                   }, function(err, data){
                       if(!err){
                           if(data){
                               res.json({status_code: 204, message:'Da quan tam nguoi dung nay', data:{}});
                           }else{
                               var ob = new Follow();
                               ob.userA_follow = req.header('userId');
                               ob.userB_follow = req.param('userId');
                               ob.save(function(err){
                                   if(!err){
                                       res.json({status_code: 200, message: '', data: 1});
                                   } else{
                                       res.json({status_code: 204, message: 'Them quan tam that bai', data:0});
                                   }
                               });
                           }
                       }else{
                           res.json({status_code: 404, message: 'Sai param', data: 0 });
                       }
                   });

               }else{
                   res.json({status_code: 404, message: 'Sai auth_token', data:0});
               }
           } else{
               res.json({status_code: 404, message: 'Sai userId', data: 0});
           }
        });
    });

    /*
    *   Get list following
    *       - input:
    *           + header: userId, auth_token
    *           + params: 
    *       - Output:
    *           + list following
    *
    * */

    app.get('/api/follows/get_list_following.json', function(req, res){
       user.findOne({
          _id: req.header('userId'),
           auth_token: req.header('auth_token')
       }, function(err, data){
           if(!err){
               if(data){
                   follow.find({
                       userA_follow: req.header('userId')
                   }, function(err, data){
                       if(!err){
                           if(data){
                               res.json({status_code: 200, message: '', data:data});
                           }else{
                               res.json({status_code: 204, message:'Chua quan tam ai', data:{}});
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
     *   Check following
     *       - input:
     *           + header: userId, auth_token
     *           + param: userId2
     *       - Output:   check following
     *  -----------------------------------------------------------------
     * */
    app.get('/api/follows/check_follow.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    follow.findOne({
                        userA_follow: req.header('userId'),
                        userB_follow: req.param('userId')
                    }, function(err, data) {
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: 1});
                            }else{
                                res.json({status_code: 204, message: 'Chua quan tam nguoi dung nay', data: 0});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: 0});
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
     *   Count following
     *       - input:
     *           + header: userId, auth_token
     *           + param: 
     *       - Output:   count following
     *  -----------------------------------------------------------------
     * */
    app.get('/api/follows/count_following.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    follow.count({
                        userA_follow: req.header('userId')
                    }, function(err, data) {
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: data});
                            }else{
                                res.json({status_code: 204, message: 'Chua quan tam nguoi dung nao', data: 0});
                            }
                        }else{
                            res.json({status_code: 404, message: 'Sai params', data: 0});
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
     *   Remove follow
     *       - input:
     *           + header: userId, auth_token
     *           + param: userId2
     *       - Output: 1: success, 0: failure
     *  -----------------------------------------------------------------
     * */
    app.del('/api/follows/delete_follow.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    follow.findOne({
                        userA_follow: req.header('userId'),
                        userB_follow: req.param('userId2')
                    }).remove(function(err, data){
                        if(!err){
                            if(data){
                                res.json({status_code: 200, message: '', data: 1});
                            }else{
                                res.json({status_code: 204, message: 'Xoa quan tam that bai', data: 0});
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

};