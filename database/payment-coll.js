// CHỌN GHẾ
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PaymentSchema = new Schema({

    chair: String,

    price: String,

    detailBuses: {
        type: Schema.Types.ObjectId,
        ref: "detail-buses",
    }
});

const PAYMENT_SCHEMA = mongoose.model('seat', PaymentSchema);
module.exports  = PAYMENT_SCHEMA;