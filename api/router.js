const queries = require('../db/queries');
const express = require('express');
const bcrypt = require('bcrypt');
const valid = require('./validate');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/auth/login', (req, res, next) => {
  if (valid.user(req.body)) {
    queries.getUserByEmail(req.body.email).then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then(result => {
          if (result) {
            jwt.sign({
              id: user.id
            }, process.env.TOKEN_SECRET, (err, token) => {
              console.log(err, token);
              res.json({
                //message: `Logged in as ${user.name}.`,
                token,
                id: user.id
              });
            });
          } else {
            next(new Error("Password Incorrect"))
          }
        });
      } else {
        next(new Error("Email Not Found (case sensitive)"))
      }
    });
  } else {
    next(new Error("Invalid Email/Password"))
  }
});

router.post('/users', (req, res, next) => {
  if (valid.user(req.body)) {
    queries.getUserByEmail(req.body.email).then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10)
          .then((hash) => {
            let user = {
              name: req.body.name,
              email: req.body.email,
              password: hash
            };
            queries.createUser(user).then(user => {
              res.json({
                message: "Success",
                user
              });
            });
          });
      } else {
        next(new Error("Email in use"));
      }
    });
  } else {
    next(new Error("Invalid Password"));
  }
});


router.get('/users', (req, res, next) => {
  queries.getAllUsers().then(users => {
    res.json(users)
  });
});

router.get('/users/:id/lists', (req, res) => {
  queries.getListsByUserId(req.params.id).then(lists => {
    res.json(lists);
  });
});

router.get('/lists/:id/items', (req, res) => {
  queries.getItemsByListId(req.params.id).then(items => {
    res.json(items);
  });
});

router.post('/list', (req, res, next) => {
  queries.createItem('list', req.body).then(response => {
    res.json(response);
  });
});

router.post('/item', (req, res, next) => {
  queries.createItem('item', req.body).then(response => {
    res.json(response);
  });
});

router.put('/list/:id', (req, res, next) => {
  queries.updateItem('list', req.params.id, req.body).then(response => {
    res.json(response);
  });
});

router.put('/item/:id', (req, res, next) => {
  queries.updateItem('item', req.params.id, req.body).then(response => {
    res.json(response);
  });
});

router.delete('/list/:id', (req, res, next) => {
  queries.deleteItem('list', req.params.id).then(response => {
    res.json(response);
  });
});

router.delete('/item/:id', (req, res, next) => {
  queries.deleteItem('item', req.params.id).then(response => {
    res.json(response);
  });
});

module.exports = router;
