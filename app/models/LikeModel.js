var mongo = require('mongoose');

Schema = mongo.Schema();
LikeSchema = mongo.Schema({
	user_id:{
		type: mongo.SchemaTypes.ObjectId,				// Nguoi yeu thich
		ref: 'tb_user'
	}, article_id: {
		type: mongo.SchemaTypes.ObjectId,				// Bai viet yeu thich
		ref: 'tb_article'
	}
});

Like = mongo.model('tb_like', LikeSchema);
module.exports = Like;