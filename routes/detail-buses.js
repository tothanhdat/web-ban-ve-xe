const route             = require('express').Router();
const { renderToView }  = require('../utils/childRouting');
const DETAIL_BUSES_MODEL       = require('../models/detail-buses');


route.post('/add-buses', async (req, res) => {

    let { startPlace, endPlace, distance, dayTime, hourStart, price, hotline } = req.body;

    let resultInsert = await DETAIL_BUSES_MODEL.insert({ startPlace, endPlace, distance, dayTime, hourStart, price, hotline });
    console.log({ resultInsert })
    return res.json(resultInsert);

})

route.get('/list-buses', async (req, res) => {

    let listBuses = await DETAIL_BUSES_MODEL.getList();
    console.log({ listBuses })

    return res.json(listBuses);

})


module.exports = route;