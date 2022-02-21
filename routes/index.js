let express = require('express');
let passport = require('passport');
let router = express.Router();
let mongoose = require('mongoose');

let userModel = require('../models/user');
let User = userModel.User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home', displayName: req.user ? req.user.displayName : ''});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home', displayName: req.user ? req.user.displayName : ''});
});

/* GET About me page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me', displayName: req.user ? req.user.displayName : ''});
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects', displayName: req.user ? req.user.displayName : ''});
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services', displayName: req.user ? req.user.displayName : ''});
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me', displayName: req.user ? req.user.displayName : ''});
});

//GET LOGIN PAGE
router.get('/login', function(req, res, next){
  if(!req.user)
  {
    res.render('auth/login',
    {
      title: "Login",
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName:''
    })
  }
  else
  {
    console.log(req.user);
    return res.redirect('/');
  }
});

//POST LOGIN PAGE
router.post('/login', function(req, res, next){
  passport.authenticate('local',
  (err, user, info) => {
    //server err??
    if(err)
    {
      return next(err);
    }
    //is there a user login error?
    if(!user)
    {
      req.flash('loginMessage', 'Authentication Error');
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      //server err?
      if(err)
      {
        return next(err);
      }
      return res.redirect('/businessContactList')
    });
  })(req,res,next);
});

//GET for displaying register page
router.get('/register', function(req, res, next){
  //check if the user is not already logged in
  if(!req.user)
  {
    res.render('auth/register',
    {
      title: 'Register',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName:''
    });
  }
  else
  {
    return res.redirect('/');
  }
});

//POST for processing register page
router.post('/register', function(req, res, next){
  //instantiate a user object
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName
  });
  User.register(newUser, req.body.password, (err) =>{
    if(err)
    {
      console.log("Error:Inserting New User");
      if(err.name == "UserExistsError")
      {
        req.flash(
          'registerMessage',
          'Registration Error: User Already Exists!'
        );
        console.log('Error: User Already Exists!')
      }
      return res.render('auth/register', {
        title: 'Register',
        messages: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName:''
      });
    }
    else
    {
      return passport.authenticate('local')(req, res, () =>{
        res.redirect('/businessContactList')
      });
    }
  });

})

//GET to perform user logout
router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});
module.exports = router;
