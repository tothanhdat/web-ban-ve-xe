const BUSES_MODEL        = require('../models/detail-buses');
const { PROVINCES }   = require('../config/constants/cf_province');

let renderToView = async function(req, res, view, data) {

    let listBuses = await BUSES_MODEL.getList();
    
    data.listBuses   = listBuses.data;
    data.PROVINCES   = PROVINCES;

    return res.render(view, data);
}
exports.renderToView = renderToView;