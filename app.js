const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const { renderToView }  = require('./utils/childRouting');

const BUSES_ROUTER       = require('./routes/detail-buses');

const BUSES_MODEL       = require('./models/detail-buses');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    renderToView(req, res, 'pages/home', { });
})

app.get('/chon-ghe', async (req, res) => {
    let { busesID } = req.query;
    let infoBuses = await BUSES_MODEL.getInfo({ busesID });
    console.log({ infoBuses })
    renderToView(req, res, 'pages/choose-seat', { infoBuses: infoBuses.data });
})

app.get('/thong-tin-khach-hang', (req, res) => {
    res.render('pages/info-customer')
})

app.get('/hoan-thanh-dat-ve', (req, res) => {
    res.render('pages/finish')
})

app.use('/buses', BUSES_ROUTER);

const uri = 'mongodb://localhost/webbanve';
const PORT = process.env.PORT || 5000;

mongoose.set('useCreateIndex', true); //ẩn cảnh báo
mongoose.set('useUnifiedTopology', true); // ẩn cảnh báo

mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
});