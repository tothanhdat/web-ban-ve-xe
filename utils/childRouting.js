const BUSES_MODEL        = require('../models/detail-buses');
const { PROVINCES }   = require('../config/constants/cf_province');
const moment            = require('moment');


let renderToView = async function(req, res, view, data) {

    let infoUser        = req.session;
    console.log({ infoUser })

    let listBuses       = await BUSES_MODEL.getList();
    data.infoUser       = infoUser.user
    data.listBuses      = listBuses.data;
    data.PROVINCES      = PROVINCES;
    data.moment         = moment;

    return res.render(view, data);
}
exports.renderToView = renderToView;