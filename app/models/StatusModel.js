var mongo = require('mongoose');

Schema = mongo.Schema();
StatusSchema = mongo.Schema({
	user_id:{						// Nguoi dang trang thai
		type: mongo.SchemaTypes.ObjectId,
		ref: 'tb_user'
	}, content: {						// Noi dung trang thai
		type: String,
		default: ''
	}, removed: {						// Kiem tra trang thai da xoa chua
		type: Boolean,
		default: false
	}, post_date:{						// Thoi gian dang trang thai
		type: Date,
		default: new Date()
	}, update_date: {
		type: Date 						// Thoi gian cap nhat trang thai
	}
});

Status = mongo.model('tb_status', StatusSchema);
module.exports = Status;