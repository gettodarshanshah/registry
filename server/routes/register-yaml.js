const express = require('express');

const routes = express.Router();
const yaml = require('yamljs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const MongoClient = require('mongodb');
const assert = require('assert');

const dbName = 'aayush';
const url = 'mongodb://localhost:27017';
const authenticate = require("./../Authentication/Authenticate");


routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());
routes.post('/', (req) => {
  const application = yaml.parse(req.body.yaml);
  const appDetails = req.body.appDetails;

  const payload = {
    Application: '',
    Subscriptions: ''
  }

  payload.Application = application.Application_Name;
  payload.Subscriptions = application.document_description.subscription;

  const private = require('fs').readFileSync('./private.key','utf8');

  const signOptions = {
    issuer: "stackroute",
    subject: "mail@stackroute.in"
  }


  const token = jwt.sign(payload, private, signOptions );

  const final = {application,token,appDetails};
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);

    const db = client.db(dbName);
    function insertDocuments(db) {
      const collection = db.collection('application_activities');
      collection.insertMany(
        [final], (err, result) => {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          assert.equal(1, result.ops.length);

        },
      );
    }
    insertDocuments(db, () => {
      client.close();
    });
  });
});
module.exports = routes;
