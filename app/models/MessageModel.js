var mongo = require('mongoose');

Schema = mongo.Schema();
MessageSchema = mongo.Schema({
	chat_id: {
		type: Number,
		default: 0
	}, sender: {									
		type: mongo.SchemaTypes.ObjectId,		// Nguoi gui tin nhan
		ref: 'tb_user'
	}, recipient: {								
		type: mongo.SchemaTypes.ObjectId,		// Danh sach Nguoi nhan tin nhan	
		ref: 'tb_user'
	}, content: {			// Noi dung tin nhan
		type: String,
		default: ''
	}, status:{
		type: Boolean,		// Trang thai cua tin nhan: false: chua doc, true: da doc
		default: false				
	},sent_date: {			// thoi gian gui tin
		type: Date,
		default: new Date()
	}, receive_date: {		// thoi gian nhan tin
		type: Date,
		default: null
	}
});


Message = mongo.model('tb_message', MessageSchema);
module.exports = Message;