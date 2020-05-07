// TUYẾN
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const DetailBusesSchema = new Schema({

    //Quãng đường (km)
    distance: String,

    //Ngày đi
    dayTime: Date,

    //giờ đi
    hourStart: String,

    //Giá
    price: String,

    //Chọn ghế
    seat: String,

    //Tuyến
    buses: {
        type: Schema.Types.ObjectId,
        ref: "buses",
    }
    
});

const DETAIL_BUSES_MODEL = mongoose.model('detail-buses', DetailBusesSchema);
module.exports  = DETAIL_BUSES_MODEL;