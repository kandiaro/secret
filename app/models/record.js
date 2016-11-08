var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var recordSchema = new Schema({
    recordname : { type: String, required: true, trim: true },
    url       : { type: String },
    username  : { type: String },
    password  : { type: String },
    note      : { type: String },
    recordcreated: { type: Date, default: Date.now},
    listid    : { type: Schema.ObjectId, ref: 'List', required: true}
});

recordSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('Record', recordSchema);
