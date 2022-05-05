const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
      email: {
        type: String,
        required: true,
        uniform: true
      },
      name:{ 
        type:String,
        required: true,
      },
      password: String,
      DOB: {type: String},
      address: {type:String,
           maxlength: 200
      },
      profilePhoto: String,
      lastVisited: { type: Date, default: new Date() }
});

var UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;