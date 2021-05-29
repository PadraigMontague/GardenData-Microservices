process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);


/**
 * TESTING REGISTER API ENDPOINT
 * MODEL
 * DB CONNECTION
 */

describe('/POST register', () => {
    it('it should POST the registration data to create a new user', (done) => {
        chai.request(server)
            .post('/register')
            .send(
                {
                    username: 'test',
                    password: 'test'
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({ message: 'User Created' });
                done();
            });
    });
});

describe('/POST register', () => {
    it('it should POST the registration data to create a new user but user already exists', (done) => {
        chai.request(server)
            .post('/register')
            .send(
                {
                    username: 'test',
                    password: 'test'
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({ message: 'Username already exists' });
                done();
            });
    });
});

describe('/POST register', () => {
    it('it should POST the registration data to create a new user but username is not defined', (done) => {
        chai.request(server)
            .post('/register')
            .send(
                {
                    username: '',
                    password: 'test'
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({ message: 'User details not completed' });
                done();
            });
    });
});

describe('/POST register', () => {
    it('it should POST the registration data to create a new user but password is not defined', (done) => {
        chai.request(server)
            .post('/register')
            .send(
                {
                    username: 'test',
                    password: ''
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({ message: 'User details not completed' });
                done();
            });
    });
});

describe('/POST register', () => {
    it('it should POST the registration data to create a new user but username and password are not defined', (done) => {
        chai.request(server)
            .post('/register')
            .send(
                {
                    username: '',
                    password: ''
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({ message: 'User details not completed' });
                done();
            });
    });
});

/**
 * TESTING LOGIN API ENDPOINT
 * MODEL
 * DB CONNECTION
 */

describe('/POST login', () => {
    it('it should POST the login data and return JWT token data', (done) => {
        chai.request(server)
            .post('/login')
            .send(
                {
                    username: 'test',
                    password: 'test'
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('/POST login', () => {
    it('it should POST the login data and return a message: false', (done) => {
        chai.request(server)
            .post('/login')
            .send(
                {
                    username: '',
                    password: 'test'
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({ message: false });
                done();
            });
    });
});

describe('/POST login', () => {
    it('it should POST the login data and return a message: false', (done) => {
        chai.request(server)
            .post('/login')
            .send(
                {
                    username: 'test',
                    password: ''
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({ message: false });
                done();
            });
    });
});

describe('/POST login', () => {
    it('it should POST the login data and return a message: false', (done) => {
        chai.request(server)
            .post('/login')
            .send(
                {
                    username: '',
                    password: ''
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({ message: false });
                done();
            });
    });
});

/**
 * TESTING AUTH API ENDPOINT
 * MODEL
 * DB CONNECTION
 */

describe('/POST auth', () => {
    it('it should POST user JWT and return that it is still valid', (done) => {
        chai.request(server)
            .post('/auth')
            .send(
                {
                    "token": "Enter token here"
                }
            )
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                done();
            });
    });
});

describe('/POST auth', () => {
    it('it should POST user JWT and return that it is expired', (done) => {
        chai.request(server)
            .post('/auth')
            .send(
                {
                    "token": "Enter token here"
                }
            )
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({ message: "Token is not valid" });
                done();
            });
    });
});

describe('/POST auth', () => {
    it('it should POST user JWT but token is undefined, therefore return token is not recieved', (done) => {
        chai.request(server)
            .post('/auth')
            .send(
                {
                    "token": ""
                }
            )
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({ message: "Token not recieved" });
                done();
            });
    });
});