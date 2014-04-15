var mongo = require('mongoose');

Schema = mongo.Schema();
CommentSchema = mongo.Schema({
    user_id: {
        type: mongo.SchemaTypes.ObjectId,		// Nguoi binh luan
        ref: 'tb_user'
    }, article_id: {
        type: mongo.SchemaTypes.ObjectId,		// Bai viet binh luan
        ref: 'tb_article'
    }, content: {
        type: String,								// Noi dung binh luan
        default: ''
    }, comment_date: {
        type: Date,
        default: new Date()							// Thoi gian binh luan
    }, update_date: {
        type: String,
        default: '' 									// Thoi gian cap nhat binh luan
    }
});

Comment = mongo.model('tb_comment', CommentSchema);
module.exports = Comment;