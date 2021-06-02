const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const SowingModel = require('../Models/SowingModel');
const PlantingModel = require('../Models/PlantingModel');
const HarvestingModel = require('../Models/HarvestingModel');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let checkToken = (token,fun) => {
    fetch('http://localhost:5001/Auth', { method: 'POST', body: JSON.stringify({ token: token }), headers: { 'Content-Type': 'application/json' }, })
        .then(res => res.json())
        .then(json => fun(json));
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/sowingForm', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let sowingForm = new SowingModel(req.body.plantType, req.body.date, req.body.quantity, req.body.username);
            sowingForm.createSowing((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
        }
    });
});

app.get('/getSowingData', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let getData = new SowingModel(null, null, null, req.body.username);
            getData.getAllData((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
        }
    });
});

app.get('/getSowingDataByDate', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let getData = new SowingModel(null, req.body.date, null, req.body.username);
            getData.getAllDataByDate((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
        }
    });
});

app.get('/getSowingDataByType', (req, res) => {

    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let getData = new SowingModel(req.body.plantType, null, null, req.body.username);
            getData.getDataByType((result) => {
                res.status(200).json(result);
            });
        } else {
           let message = {"message": "Unauthorised Access"};
           res.status(200).json(message);
        }
    });
});

app.get('/getSowingDataByDT', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let getData = new SowingModel(req.body.plantType, req.body.date, null, req.body.username);
            getData.getDataByDT((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
         }
     });
});

app.post('/plantingForm', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let plantingForm = new PlantingModel(req.body.plantType, req.body.date, req.body.quantity, req.body.username);
            plantingForm.createPlanting((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
         }
     });
});

app.get('/getPlantingData', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let getData = new PlantingModel(null, null, null, req.body.username);
            getData.getAllData((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
         }
     });
});

app.get('/getPlantingDataByDate', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let getData = new PlantingModel(null, req.body.date, null, req.body.username);
            getData.getAllDataByDate((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
         }
     });
});

app.get('/getPlantingDataByType', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let getData = new PlantingModel(req.body.plantType, null, null, req.body.username);
            getData.getDataByType((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
         }
     });
});

app.get('/getPlantingDataByDT', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let getData = new PlantingModel(req.body.plantType, req.body.date, null, req.body.username);
            getData.getDataByDT((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
         }
     });
});

app.post('/harvestingForm', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let harvestForm = new HarvestingModel(req.body.plantType, req.body.date, req.body.quantity, req.body.username);
            harvestForm.createHarvest((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
         }
     });
});

app.get('/getHarvestData', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let getData = new HarvestingModel(null, null, null, req.body.username);
            getData.getAllData((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
         }
     });
});

app.get('/getHarvestDataByDate', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let getData = new HarvestingModel(null, req.body.date, null, req.body.username);
            getData.getAllDataByDate((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
         }
     });
});

app.get('/getHarvestDataByType', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let getData = new HarvestingModel(req.body.plantType, null, null, req.body.username);
            getData.getDataByType((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
         }
     });
});

app.get('/getHarvestDataByDT', (req, res) => {
    let token = req.body.token;
    checkToken(token,(exp) => {
        console.log(exp);
        if(exp.expired === false) {
            let getData = new HarvestingModel(req.body.plantType, req.body.date, null, req.body.username);
            getData.getDataByDT((result) => {
                res.status(200).json(result);
            });
        } else {
            let message = {"message": "Unauthorised Access"};
            res.status(200).json(message);
         }
     });
});

module.exports = http.listen(4000, () => {
    console.log('Listening on port 4000');
})