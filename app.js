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

app.get('/thong-tin-khach-hang', (req, res) => {
    res.render('pages/info-customer')
})

app.get('/hoan-thanh-dat-ve', (req, res) => {
    res.render('pages/finish')
})

app.get('/dang-ky', (req, res) => {
    res.render('pages/register')
})
app.get('/dang-nhap', (req, res) => {
    res.render('pages/login')
})

app.get('/lich-trinh', async (req, res) => {
    let listLichTrinh = await BUSES_MODEL.getList();
    console.log({ listLichTrinh })
    renderToView(req, res, 'pages/lich-trinh', { listLichTrinh: listLichTrinh.data });
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