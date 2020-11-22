var express = require('express');
var router = express.Router();

const axios = require('axios');
var http = require('http');
const httpAgent = new http.Agent({keepAlive: true, maxSockets: 1});

/* base64 image encoding and JSON parsing
var p;
var canvas = document.createElement("canvas");
var tempIMG = document.createElement("img");

function base64encodeAnImageANDparseToJSON(){
    p=document.getElementById("fileUpload").value;
    tempIMG.setAttribute('src', p);
    canvas.width = tempIMG.width;
    canvas.height = tempIMG.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(tempIMG, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    alert("from getbase64 function"+dataURL);
    console.log(JSON.stringify(dataURL));
    return JSON.stringify(dataURL);
}
*/

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
    let res = axios.get('/user?Name="Ivan"', {httpAgent});
    console.log(res);
}
async function post(){
    let res = await axios.post('http://localhost:16000', {httpAgent}).then(function (response) {
        console.log(response);
    }).catch(function (error){
        console.log(error);
    })
    console.log(`Status code: ${res.status}`);
    console.log(`Status text: ${res.StatusText}`);
    console.log(`Request method: ${res.request.method}`);
    console.log(`Path: ${res.request.path}`);

    console.log(`Date: ${res.headers.date}`);
    console.log(`Data: ${res.data}`);
}

module.exports = router;