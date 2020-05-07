// TUYẾN
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BusesSchema = new Schema({

    //Điểm đi
    startPlace: String,

    //Điểm đến
    endPlace: String,

    detailBuses: [{
        type: Schema.Types.ObjectId,
        ref: "detail-buses",
    }]
});

const BUSES_MODEL = mongoose.model('buses', BusesSchema);
module.exports  = BUSES_MODEL;