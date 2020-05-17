// TUYẾN
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const DetailBusesSchema = new Schema({

    startPlace: String,

    endPlace: String,

    //Quãng đường (km)
    distance: String,

    //Ngày đi
    dayTime: Date,

    //giờ đi
    hourStart: String,

    //Giá
    price: String,

    //Chọn ghế
    hotline: String,

    //Danh sách booking
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: "booking",
    }],

    seat: [],
    
});

const DETAIL_BUSES_MODEL = mongoose.model('detail-buses', DetailBusesSchema);
module.exports  = DETAIL_BUSES_MODEL;