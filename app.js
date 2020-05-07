const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');

//const USER_ROUTER       = require('./routing/apps/user');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('pages/home')
})

app.get('/chon-ghe', (req, res) => {
    res.render('pages/choose-seat')
})

app.get('/thong-tin-khach-hang', (req, res) => {
    res.render('pages/info-customer')
})

app.get('/hoan-thanh-dat-ve', (req, res) => {
    res.render('pages/finish')
})

//app.use('/', USER_ROUTER);

const uri = 'mongodb://localhost/webbanve';
const PORT = process.env.PORT || 5000;

mongoose.set('useCreateIndex', true); //ẩn cảnh báo
mongoose.set('useUnifiedTopology', true); // ẩn cảnh báo

mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
});