// CHỌN GHẾ
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({

    fullname: String,
    email: String,
    password: String,
    phone: String,
    birthDay: String,
    province: String,
    district: String,
    CMND: String,

    //Danh sách booking
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: "booking",
    }],

    role: { type: Number, default: 0 },

});

const USER_MODEL = mongoose.model('user', UserSchema);
module.exports  = USER_MODEL;