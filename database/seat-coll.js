// CHỌN GHẾ
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const SeatSchema = new Schema({

    chair: String,

    detailBuses: {
        type: Schema.Types.ObjectId,
        ref: "detail-buses",
    }
});

const BUSES_MODEL = mongoose.model('seat', SeatSchema);
module.exports  = BUSES_MODEL;