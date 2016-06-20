var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    debug = require('debug')('comment-system:user-schema'),
    config = require('../conf/config');

var UserSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
UserSchema.pre('save', function(next) {
    var user = this;
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    // only hash the password if it has been modified (or is new)
    if (this.isModified('password')) {
        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                user.password = hash;
                return next();
            });
        });

    } else return next();
});

UserSchema.statics.findByUsername = function(username, cb) {
    return this.findOne({
        username: username
    }, cb).exec();
};

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var User = mongoose.model('AppUser', UserSchema);
mongoose.connection.on('open',init);
function init() {
    User.findByUsername('admin').then(function(admin) {
        debug(`in findByUsername: admin=${admin.toJSON()}`);
        // debug(`Users registered: ${count}`);
        if (!admin) {
            debug('Creating admin user');
            var admin = new User({
                name: 'Administrator',
                username: 'admin',
                password: 'admin',
                isAdmin: true
            });
            debug(`${admin.toJSON()}`);
            admin.save().then(function(savedAdmin) {
                return debug(`admin user saved ${JSON.stringify(savedAdmin)}`);
            });
        } else {
            debug('admin user found');
        }
    }).then(function() {
        debug('OK!');
    });
}
debug('Creating admin user');
var admin = new User({
    name: 'Administrator',
    username: 'admin',
    password: 'admin',
    isAdmin: true
});
debug(`${admin.toJSON()}`);
admin.save().then(function() {
    return debug(`admin user saved ${JSON.stringify(admin)}`);
});

module.exports = User;
