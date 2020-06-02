const ObjectID = require('mongoose').Types.ObjectId;
const SEAT_COLL = require('../database/seat-coll');
const DETAIL_BUSES_COLL = require('../database/detail-buses-coll');

module.exports = class Seat extends SEAT_COLL {

    static insert({ chair, busesID, price }) {
        return new Promise(async resolve => {
            try {

                let dataInsert = {
                    chair,
                    detailBuses: busesID,
                    price
                }

                console.log({ dataInsert })

                if (!chair || !ObjectID.isValid(busesID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterInsert = new SEAT_COLL(dataInsert);
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert_detail_buses' });
                resolve({ error: false, data: infoAfterInsert });
                
                let pushChairOnSeatArr = await DETAIL_BUSES_COLL.findByIdAndUpdate(busesID, {
                    $push: { seat: chair }
                }, {new: true})

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList() {
        return new Promise(async resolve => {
            try {
                let listChair = await SEAT_COLL.find();

                if (!listChair) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listChair });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getInfo({ chairID }) {
        return new Promise(async resolve => {
            try {
                
                let infoChair = await SEAT_COLL.findById(chairID);

                if (!infoChair) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoChair });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ chairID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(chairID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await SEAT_COLL.findByIdAndDelete(chairID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
    
}