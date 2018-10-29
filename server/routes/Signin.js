const express = require('express');

const routes = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());
const MongoClient = require('mongodb');
const assert = require('assert');

const dbName = 'aayush';
const url = 'mongodb://localhost:27017';

// connecting to mongodb

routes.post('/', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);

    const db = client.db(dbName);

    function findDocuments(db) {
      const collection = db.collection('register');
      collection.find({ email: req.body.email }).toArray((err, docs) => {
        assert.equal(err, null);
        if (docs.length < 1) {
          res.status(500).json({ message: 'login failed' });
        }
        const result = bcrypt.compareSync(req.body.password, docs[0].password);

        if (result) {
          const token = jwt.sign({

            email: docs[0].email,
            organisationName: docs[0].organisationName,

          },
          'shhhhh');
          res.json({

            token,
            organisationName: docs[0].organisationName,
          });
        }
      });
    }

    findDocuments(db, () => {
      client.close();
    });
  });
});

module.exports = routes;
