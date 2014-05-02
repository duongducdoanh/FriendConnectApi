var mongo = require('mongoose');

Schema = mongo.Schema;
UserSchema = mongo.Schema({
	username: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''	
	}, email: {
		type: String,
		default: ''
	}, auth_token:{
        type: String,
        default: ''
    }, fullname: {
		type: String,
		default: ''
	}, avatar: {
		type: String,
		default: ''
	}, cover: {
		type: String,
		default: ''
	}, address: {
		type: String,
		default: ''
	}, phone: {
		type: String,
		default: ''
	}, birthday: {
		type: String,
		default:''
	}, gender: {				// 1: nam, 0 nu
		type: Number,
		default: 1
	}, online: {
		type: Boolean,
		default: false
	}, join_date: {
		type: Date,
		default: new Date()
	}, status: {
		type: String,
		default: ''
	}, longitude: {
		type: String,
		default: ''
	}, latitude: {
		type: String,
		default: ''
	}
});

User = mongo.model('tb_user', UserSchema);

module.exports = User;

