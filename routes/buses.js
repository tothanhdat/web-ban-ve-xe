const route             = require('express').Router();
const { renderToView }  = require('../utils/childRouting');
const BUSES_MODEL       = require('../models/buses');


// route.post('/add-buses', async (req, res) => {

//     let { startPlace, endPlace } = req.body;

//     let resultInsert = await BUSES_MODEL.insert({ startPlace, endPlace });
//     console.log({ resultInsert })
//     return res.json(resultInsert);

// })

module.exports = route;