var mongo = require('mongoose');

Schema = mongo.Schema();
ArticleSchema = mongo.Schema({
	poster: {
        type: mongo.SchemaTypes.ObjectId,
        ref: 'tb_user'
	}, content: {	
		type: String,								// Noi dung bai viet
		default: ''
	}, url_image: {
		type: String,								// Duong dan anh bai viet
		default: ''
	}, post_date: {
		type: Date,									// Thoi gian dang bai
		default: Date.now
	}, update_date: {								// Thoi gian cap nhat
		type: String,
		default: ''
	}, post_location: {
		type: String,								// Vi tri dang bai
		default: ''
	}
});

Article = mongo.model('tb_article', ArticleSchema);
module.exports = Article;