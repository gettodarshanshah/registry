const express = require('express');

const routes = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const assert = require('assert');

const dbName = 'aayush';
const url = 'mongodb://localhost:27017';
const cors = require('cors');

routes.use(cors());
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());


routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());
routes.post('/', (req) => {
  const name = req.body;
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);

    const db = client.db(dbName);
    function insertDocuments(db, callback) {
      const collection = db.collection('Application_list');
      collection.insertMany(
        [name], (err, result) => {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          assert.equal(1, result.ops.length);
          callback(result);
        },
      );
    }
    insertDocuments(db, () => {
      client.close();
    });
  });
});


routes.get('/:organisation', (req, res) => {
  var orgName = req.params.organisation;
  var list = [];
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    function findDocuments(db, callback) {
      const collection = db.collection('application-activities');
      collection.find({ organisationName: orgName }).toArray((err, docs) => {
        assert.equal(err, null);
        if (docs.length < 1) {
          res.status(500).json({ message: 'login failed' });
        }
        docs.forEach(function(element) {
          list.push(element.activityname)
        });

        res.send(list);
        callback(docs);
      });
    }

    findDocuments(db, () => {
      client.close();
    });
  });
});


module.exports = routes;
