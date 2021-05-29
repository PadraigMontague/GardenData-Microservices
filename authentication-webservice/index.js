const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const dotnet = require('dotenv');
const cors = require('cors');
const Authentication = require('./Models/Authentication');
const Login = require('./Models/Login');
const User = require('./Models/User');

dotnet.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let user = new User(username, password);

    if (username === undefined || username === "" || password === undefined || password === "") {
        res.status(200).json({ message: 'User details not completed' });
    } else {
        user.createUser((result) => {
            res.status(200).json(result);
        });
    }
});

app.post('/login', (req, res) => {
    const user = { username: req.body.username, password: req.body.password, rememberMe: false };
    const login = new Login(user.username, user.password, user.rememberMe);
    login.checkUserCredientals((result) => {
        if (result.message) {
            login.generateToken(res);
        } else {
            console.log(result.message);
            res.status(200).json(result);
        }
    });
});

app.post('/auth', (req, res) => {
    let token = req.body.token;
    if (token === undefined || token === "") {
        res.status(200).json({ message: "Token not recieved" });
    } else {
        let Auth = new Authentication(token).isExpired();
        res.status(200).json(Auth);
    }
});


module.exports = http.listen(5001, function () {
    console.log('Listening on port 5001');
});