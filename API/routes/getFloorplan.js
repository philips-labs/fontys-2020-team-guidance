var express = require('express');
var router = express.Router();

const axios = require('axios');
var http = require('http');
const httpAgent = new http.Agent({keepAlive: true, maxSockets: 1});


/* GET floorplans listing. */
router.get('/', function(req, res, next) {
    /*var data = "here goes the passed json file of an image" */
    let dataArray = [
       { id: 1, name: "Ivan"},
       { id: 2, name: "Boris"}
    ]
    post();
    //get();
    res.json({
        data: dataArray
    })
    
});
async function get(){
    let res = axios.get("http://localhost:16000/floorplan?",
     {httpAgent});
    console.log(res);
}
async function post(){
    let res = await axios.post('http://localhost:16001', {
         Name: 'Fred',
         Age: '23',
        })
        .then(function (response) {
            console.log(response);
        })
}

module.exports = router;