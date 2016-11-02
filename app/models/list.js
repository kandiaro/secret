var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var listSchema = new Schema({
    listname : { type: String, required: true, trim: true },
    listentries : [ { type: Schema.ObjectId, ref: 'Entry', index: true } ]
});
