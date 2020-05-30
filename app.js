const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const { renderToView }  = require('./utils/childRouting');
const expressSession    = require('express-session');

const checkActive       = require('./utils/checkActive');

const BUSES_ROUTER       = require('./routes/detail-buses');

const BUSES_MODEL       = require('./models/detail-buses');
const USER_MODEL       = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressSession({
    secret: 'webbanve',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 10 * 60 * 1000 * 100
    }
}))

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

app.post('/dang-ky', async (req, res) => {
    let { email, password, fullname, phone, birthDay, province, district, CMND } = req.body;
    let infoUser = await USER_MODEL.register(email, password, fullname, phone, birthDay, province, district, CMND);
    console.log({ infoUser })
    if (infoUser.error && infoUser.message == 'email_existed')
        res.json("Khong thanh cong")
    res.json(infoUser)
})

app.post('/dang-nhap', async (req, res) => {
    //req.session.isLogin = true;
    
    let { email, password } = req.body;
    let infoUser = await USER_MODEL.signIn(email, password);

    console.log({ infoUser })
    if(infoUser.error)
        return res.json(infoUser);

    // res.cookie('token', infoUser.data.token, { maxAge: 900000 });
    req.session.token = infoUser.data.token; //gán token đã tạo cho session
    req.session.email = req.body.email; 
    req.session.user = infoUser.data; 

    res.redirect('/')
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