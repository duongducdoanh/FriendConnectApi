var mongo = require('mongoose');

Schema = mongo.Schema();
FollowSchema = mongo.Schema({
	userA_follow: {
        type: mongo.SchemaTypes.ObjectId,
        ref: 'tb_user'
    }, userB_follow: {
        type: mongo.SchemaTypes.ObjectId,
        ref: 'tb_user'
    }
});

Follow = mongo.model('tb_follow', FollowSchema);
module.exports = Follow;