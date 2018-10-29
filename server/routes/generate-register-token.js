const express = require('express');

const routes = express.Router();
const morgan=require('morgan');

const MongoClient = require('mongodb');

const dbName = 'aayush';
const url = 'mongodb://localhost:27017';

routes.use(morgan('dev'))
routes.get('/', (req, res) => {
    // const app = req.params.appname;
    const {select , app_name}=req.query;
    console.log( app_name);
    var arr = [];
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db('aayush');
        const cursor = db.collection('application_activities').find({'appDetails' : select});
        cursor.forEach((doc) => {
                var obj = {appName : '', token :'', appDetail : ''};
                obj.appName = doc.application.Application_Name;
                obj.token = doc.token;
                obj.appDetail = doc.appDetails;
                arr.push(obj);
                require('fs').writeFile(`${obj.appName}_${obj.appDetail}.txt`, JSON.stringify(obj), function(err, data){
                    if (err) console.log(err);
                    console.log("Successfully Written to File.",data);
                });
            
        },
        () => {
            console.log(arr)
                // console.log("array",arr)
                client.close()
                res.send({arr})

            })

    })
})


module.exports = routes;
