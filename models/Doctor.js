const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
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

var DoctorModel = mongoose.model('doctor', DoctorSchema);

module.exports = DoctorModel;