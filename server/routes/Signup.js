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
const cors = require('cors');

routes.use(cors());
const url = 'mongodb://localhost:27017';

// connecting to mongodb


routes.post('/', (req, res) => {
  const user = {};
  user.email = req.body.email;
  user.organisationName = req.body.organisationName;
  const password = bcrypt.hashSync(req.body.password, 8);
  user.password = password;
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);

    const db = client.db(dbName);
    function insertDocuments(db, callback) {
      const collection = db.collection('register');
      collection.insertMany(
        [user], (err, result) => {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          assert.equal(1, result.ops.length);
          callback(result);
          const token = jwt.sign({
            email: user.email,
            organisationName: user.organisationName,

          },
          'shhhhh');
          res.status(200).json({
            email: user.email,
            organisationName: user.organisationName,
            token,
          });
        },
      );
    }
    insertDocuments(db, () => {
      client.close();
    });
  });
});

module.exports = routes;
