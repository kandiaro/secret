var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var listPermissionSchema = new Schema({
    listid : {type: Schema.ObjectId, ref: 'List', required: true },
    userid : {type: Schema:ObjectId, ref: 'User', required: true},
    permission: {type: String, enum: ['read','read/write']}
});
