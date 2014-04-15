var mongo = require('mongoose');

Schema = mongo.Schema;
FriendSchema = Schema({
	userA_friend: {
		type: mongo.SchemaTypes.ObjectId,			// Nguoi dung A
		ref: 'tb_user'
	}, userB_friend: {
		type: mongo.SchemaTypes.ObjectId,			// Nguoi dung B
		ref: 'tb_user'
	}, request: {										// Yeu cau ket ban
		type: Number,									// 1: A yeu cau ket ban voi B
		default: 1										// 0: A va B da ket ban
	}, add_date: {
		type: Date,
		default: new Date()								// Ngay ket ban
	}
});

Friend = mongo.model('tb_friend', FriendSchema);
module.exports = Friend;
