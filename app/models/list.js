var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var listSchema = new Schema({
    listname : { type: String, trim: true },
    listcreated: { type: Date, default: Date.now},
    listowner     : { type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('List', listSchema);
