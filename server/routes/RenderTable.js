const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const assert = require('assert');
const dbName = 'aayush';
const tableify = require('tableify');
const url = 'mongodb://localhost:27017';



routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());
routes.get('/:applicationName', (req, res) => {
   var applicationName = req.params.applicationName;
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);

    const db = client.db(dbName);

    function findDocuments(db, callback) {
      const collection = db.collection('application-activities');
      collection.find({ activityname : applicationName }).toArray((err, docs) => {
        assert.equal(err, null);
         var result = docs[0].document_description.activities_description;
       res.send(result);
        callback(docs);
      });
    }

    findDocuments(db, () => {
      client.close();
    });
  });
});
module.exports = routes;
