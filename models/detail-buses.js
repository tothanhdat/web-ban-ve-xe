const ObjectID = require('mongoose').Types.ObjectId;
const DETAIL_BUSES_COLL = require('../database/detail-buses-coll');

module.exports = class DetailBuses extends DETAIL_BUSES_COLL {

    static insert({ startPlace, endPlace, distance, dayTime, hourStart, price, hotline }) {
        return new Promise(async resolve => {
            try {

                let dataInsert = {
                    startPlace, endPlace, distance, dayTime, hourStart, price, hotline
                }

                if (!startPlace, !endPlace, !distance, !dayTime, !hourStart, !price, !hotline)
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterInsert = new DETAIL_BUSES_COLL(dataInsert);
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert_detail_buses' });
                resolve({ error: false, data: infoAfterInsert });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList() {
        return new Promise(async resolve => {
            try {
                let listDetailBuses = await DETAIL_BUSES_COLL.find();

                if (!listDetailBuses) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listDetailBuses });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getInfo({ busesID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(busesID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoBuses = await DETAIL_BUSES_COLL.findById(busesID);

                if (!infoBuses) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoBuses });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ detailBusesID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(detailBusesID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await DETAIL_BUSES_COLL.findByIdAndDelete(detailBusesID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static update({ detailBusesID, startPlace, endPlace, distance, dayTime, hourStart, price, hotline }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(detailBusesID))
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = {
                    startPlace, endPlace, distance, dayTime, hourStart, price, hotline
                }
                let infoAfterUpdate = await DETAIL_BUSES_COLL.findByIdAndUpdate(busesID, dataUpdate, 
                { new: true });
                
                if (!infoAfterUpdate)
                    return resolve({ error: true, message: 'cannot_update_data' });

                return resolve({ error: false, data: infoAfterUpdate, message: "update_data_success" });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}