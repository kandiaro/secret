var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var recordSchema = new Schema({
    recordname : { type: String, required: true, trim: true },
    url       : { type: String },
    username  : { type: String },
    password  : { type: String },
    note      : { type: String },
    listid    : { type: ObjectId, ref: 'List', required: true}
});

entrySchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('Record', entrySchema);
