const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const assert = require('assert');
const dbName = 'aayush';
const url = 'mongodb://localhost:27017';
const cors = require('cors');
const authenticate = require ("./../Authentication/Authenticate");

routes.use(cors());

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

routes.get('/:organisationName', (req, res) => {
   const orgName = req.params.organisationName;
   var list = [];
   MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    function findDocuments(db, callback) {
      const collection = db.collection('application-activities');
      collection.find({organisationName : orgName}).toArray((err, docs) => {
        assert.equal(err, null);
        if (docs.length < 1) {
          res.status(500).json({ message: 'login failed' });
        }
        docs.forEach(function(element) {
          list.push(element.document_description.subscription)
        });
        res.send(list)
        callback(docs);
      });
    }

    findDocuments(db, () => {
      client.close();
    });
  });
});


module.exports = routes;
