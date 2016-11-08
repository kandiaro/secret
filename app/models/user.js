// app/models/user.js
// load the things we need
var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
// define the schema for our user model
var userSchema = mongoose.Schema({
        displayname  : { type: String, required: true, trim: true },
        email        : { type: String, required: true, trim: true, lowercase: true},
        password     : { type: String, required: true},
        usercreated  : { type: Date, default: Date.now },
        type         : { type: String, default: 'basic' }
});

// methods ======================
// generating a hash

userSchema.path('email').validate(function (email) {
if (email) return emailRegExp.test(email);
return true
}, 'Invalid email address');


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
