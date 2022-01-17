const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

// login expects email/password
// successful login returns email and a fake token (if we ever want to use it)
router.post('/login', (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(401).json({ success: false, error: 'Bad login information' });
      return;
    }
    res.status(200).json({ success: true, email: req.body.email, token: '12345luggage' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Unknown error' });
  }
})

router.post('/register', (req, res) => {
  const { name, email, password} = req.body;
  User.findOne({email: email}, (err, user) => {
      if(user){
          res.send({ message : "User is already registerd" })
      } else {
          const user = new User({
          name,
          email,
          password

      })
      user.save( err => {
          if(err) {
              res.send(err)
          } else {
                      res.send( { message: "Successfully registered"})
                  }
          })
      }
  })
})

module.exports = router;