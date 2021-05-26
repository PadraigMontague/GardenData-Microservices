process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);
/**
 * TESTING REQUEST API ENDPOINT
 */

describe('/POST request', () => {
    it('it should return api_enpoint data to client', (done) => {
        chai.request(server)
            .post('/request')
            .send(
                {
                    server: 'authentication-webservice',
                    action: '/login',
                    username: 'tester'
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({
                    server: "authentication-webservice",
                    endpoint: "http://localhost:5001/login"
                });
                done();
            });
    });
});

describe('/POST request', () => {
    it('it should return status message containing Invalid request', (done) => {
        chai.request(server)
            .post('/request')
            .send(
                {
                    server: 'authentication-webservice',
                    action: '/logi',
                    username: 'tester'
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({
                    status: "Invalid request"
                });
                done();
            });
    });
});

describe('/POST request', () => {
    it('it should return status message containing Invalid request', (done) => {
        chai.request(server)
            .post('/request')
            .send(
                {
                    server: 'authentication-webservice',
                    action: '',
                    username: 'tester'
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({
                    status: "Invalid request"
                });
                done();
            });
    });
});

describe('/POST request', () => {
    it('it should return status message containing must select a server', (done) => {
        chai.request(server)
            .post('/request')
            .send(
                {
                    server: 'authentication-webservic',
                    action: '/login',
                    username: 'tester'
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal("Must select a server");
                done();
            });
    });
});

describe('/POST request', () => {
    it('it should return status message containing must select a server', (done) => {
        chai.request(server)
            .post('/request')
            .send(
                {
                    server: '',
                    action: '/login',
                    username: 'tester'
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal("Must select a server");
                done();
            });
    });
});

describe('/POST request', () => {
    it('it should return status message containing must select a server', (done) => {
        chai.request(server)
            .post('/request')
            .send(
                {
                    server: '',
                    action: '',
                    username: 'tester'
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal("Must select a server");
                done();
            });
    });
});

describe('/POST request', () => {
    it('it should return api_enpoint data to client', (done) => {
        chai.request(server)
            .post('/request')
            .send(
                {
                    server: 'authentication-webservice',
                    action: '/login',
                    username: ''
                })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.deep.equal({
                    server: "authentication-webservice",
                    endpoint: "http://localhost:5001/login"
                });
                done();
            });
    });
});