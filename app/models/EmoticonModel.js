var mongo = require('mongoose');

Schema = mongo.Schema();
EmoticonSchema = mongo.Schema({
	name: {								// Ten bieu tuong cam xuc
		type: String				
	}, url_emoticon: {
		type: String					// Duong dan anh bieu tuong cam xuc
	}, sysbol: {
		type: String					// Ky hieu
	}, types:{
		type: String					// Loai bieu tuong
	}

});

Emoticon = mongo.model('tb_emoticon', EmoticonSchema);
module.exports = Emoticon;