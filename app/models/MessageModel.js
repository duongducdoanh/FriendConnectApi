var mongo = require('mongoose');

Schema = mongo.Schema();
MessageSchema = mongo.Schema({
	sender: {									
		type: mongo.SchemaTypes.ObjectId,		// Nguoi gui tin nhan
		ref: 'tb_user'
	}, recipient: [{								
		type: mongo.SchemaTypes.ObjectId,		// Danh sach Nguoi nhan tin nhan	
		ref: 'tb_user'
	}], content: {			// Noi dung tin nhan
		type: String
	}, status:{
		type: Boolean,		// Trang thai cua tin nhan
		default: false
	},sent_date: {			// thoi gian gui tin
		type: Date
	}, receive_date: {		// thoi gian nhan tin
		type: Date
	}, status: {
		type: Boolean		// Trang thai gui tin
	}
});