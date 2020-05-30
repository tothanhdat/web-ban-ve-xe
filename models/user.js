const ObjectID = require('mongoose').Types.ObjectId;
const USER_COLL = require('../database/user-coll');
const { hash, compare } = require('bcrypt');
const { sign, verify } = require('../utils/jwt');

module.exports = class User extends USER_COLL {

    static register(email, password, fullname, phone, birthDay, province, district, CMND) {
        return new Promise(async resolve => {
            try {
                let checkExist = await USER_COLL.findOne({ email });
                if (checkExist)
                    return resolve({ error: true, message: 'email_existed' });
                let hashPassword = await hash(password, 8);
                let newUser = new USER_COLL({ fullname, email, password: hashPassword, phone, birthDay, province, district, CMND });
                let infoUSer = await newUser.save();
                console.log({ infoUSer })
                if (!infoUSer) return resolve({ error: true, message: 'cannot_insert' });
                resolve({ error: false, data: infoUSer });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static signIn(email, password) {
        return new Promise(async resolve => {
            try {
                const infoUSer = await USER_COLL.findOne({ email });
                if (!infoUSer)
                    return resolve({ error: true, message: 'email_not_exist' });
                const checkPass = await compare(password, infoUSer.password);
                if (!checkPass)
                    return resolve({ error: true, message: 'password_not_true' });
                await delete infoUSer.password;
                let token = await sign({ data: infoUSer });
                return resolve({ error: false, data: { infoUSer, token } });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    
}