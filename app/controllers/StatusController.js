var status = require('../models/StatusModel');
var user = require("../models/UserModel");

module.exports.controller = function(app){
	// Them trang thai
	// Lay trang thai nguoi dung
	// Cap nhat trang thai
	// Xoa trang thai

    /*  -----------------------------------------------------------------
    *   Add status
    *    - Input:
    *       + header: userId, auth_token
    *       + body:     status
    *    - Output:
    *           new Status
    *  -----------------------------------------------------------------
    * */

    app.post('/api/status/add_status.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    var ob = new Status(req.body);
                    ob.save(function(err){
                        if(!err){
                            res.json({status_code: 200, message:'', data: ob});
                        }else{
                            res.json({status_code: 204, message: 'Them trang thai that bai', data:{}});
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
     *   Get status
     *    - Input:
     *       + header: userId, auth_token
     *       + param: userId
     *    - Output:
     *       + a status
     *  -----------------------------------------------------------------
     * */
    app.get('/api/status/get_status.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    status.find({
                        user_id: req.param('userId')
                    }, function(err, data){
                        if(data){
                            res.json({status_code: 200, message: '', data: data});
                        }else if(!data){
                            res.json({status_code: 204, message: 'Get status by userId is failure', data:{}});
                        }else{
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
     *   Update status
     *    - Input:
     *       + header: userId, auth_token
     *       + param:   statusId
     *    - Output:
     *       +   a Status
     *  -----------------------------------------------------------------
     * */
    app.put('/api/status/update_status.json', function(req, res){

        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    status.findByIdAndUpdate({
                        _id: req.param('statusId')
                    }, req.body, function(err, data){
                        if (data) {
                            res.json({status_code: 200, message: '', data: data});
                        } else if (!data) {
                            res.json({status_code: 204, message: 'Update status failure', data: {}});
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
     *   Delete status
     *    - Input:
     *       + header: userId, auth_token
     *       + param: userId
     *    - Output:
     *       + 1: success, 0: failure
     *  -----------------------------------------------------------------
     * */


    app.del('/api/status/delete_status.json', function(req, res){
        user.findOne({
            _id: req.header('userId'),
            auth_token: req.header('auth_token')
        }, function(err, data){
            if(!err){
                if(data) {
                    status.findOne({
                        _id: req.param('statusId')
                    }).remove(function(err, data){
                        if (data) {
                            res.json({status_code: 200, message: '', data: data});
                        } else if (!data) {
                            res.json({status_code: 204, message: 'Remove status failure', data: data});
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
};