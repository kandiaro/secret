var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var GroupsSchema = new Schema({
	groupname: { type: String, required: true, trim: true },
	groupwner: {type: Schema.ObjectId, ref: 'User', required: true}
	members: [ { type: Schema.ObjectId, ref: 'User', index: true } ]
	});
module.exports = mongoose.model('Group', GroupsSchema);
