const route             = require('express').Router();
const { renderToView }  = require('../utils/childRouting');
const BUSES_MODEL       = require('../models/detail-buses');
const SEAT_MODEL       = require('../models/seat');


route.post('/add-buses', async (req, res) => {

    let { startPlace, endPlace, distance, dayTime, hourStart, price, hotline } = req.body;

    let resultInsert = await BUSES_MODEL.insert({ startPlace, endPlace, distance, dayTime, hourStart, price, hotline });
    console.log({ resultInsert })
    return res.json(resultInsert);

})

route.get('/list-buses', async (req, res) => {

    let listBuses = await BUSES_MODEL.getList();

    return res.json(listBuses);

})

route.get('/chon-ghe', async (req, res) => {
    let { busesID } = req.query;
    let infoBuses = await BUSES_MODEL.getInfo({ busesID });
    console.log({ infoBuses })
    renderToView(req, res, 'pages/choose-seat', { infoBuses: infoBuses.data });
})

route.get('/info-exam', async (req, res) => {
    let { busesID } = req.query;
    let infoBuses = await BUSES_MODEL.getInfo({ busesID });
    console.log({ infoBuses })
    res.json(infoBuses)
})


route.post('/chon-ghe', async (req, res) => {
    let { busesID } = req.query;
    let { chair, price } = req.body;
    console.log({ busesID, chair})
    let resultInsert = await SEAT_MODEL.insert({ chair, busesID, price });
    console.log({ resultInsert })
    res.json(resultInsert)
})


module.exports = route;