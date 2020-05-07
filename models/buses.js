const ObjectID = require('mongoose').Types.ObjectId;
const BUSES_COLL = require('../database/buses-coll');

module.exports = class Buses extends BUSES_COLL {

    static insert({ startPlace, endPlace }) {
        return new Promise(async resolve => {
            try {

                if (!startPlace || !endPlace)
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterInsert = new BUSES_COLL({ startPlace, endPlace });
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert_Buses' });
                resolve({ error: false, data: infoAfterInsert });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList() {
        return new Promise(async resolve => {
            try {
                let listBuses = await BUSES_COLL.find().limit(3);

                if (!listBuses) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listBuses });

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

                let infoBuses = await BUSES_COLL.findById(busesID);

                if (!infoBuses) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoBuses });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ busesID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(busesID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await BUSES_COLL.findByIdAndDelete(busesID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static update({ busesID, startPlace, endPlace }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(busesID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterUpdate = await BUSES_COLL.findByIdAndUpdate(busesID, { startPlace, endPlace } , 
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