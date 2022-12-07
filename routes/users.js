const express = require('express');
const router = express.Router();
const user = require('../models/User.js');
const bcrypt = require('bcrypt');
const javascripts = require('../services/userServices')


router.get('/', function (req, res, next) {
  res.render('users/login');
});

router.post('/login', function (req, res, next) {

  const memberLogin = req.body.e_mail;
  const memberPassword = req.body.password;
  const usersearch = user.search(memberLogin);
  otherErrorss = [];
  
  console.log("LOGIN");

  if( user.search(memberLogin) == undefined) {

    console.log ("faux !");
    otherErrorss.push({msg :'Wrong email or password'})
    req.session.connected=false;
    res.render('users/login',{errors:otherErrorss})

  } else if (bcrypt.compareSync(memberPassword, usersearch.password)){
    console.log("dataInClear == hash, OK c'est bon");
    req.session.connected = true;
    req.session.login = req.body.e_mail;
    req.session.id_member= usersearch.id_member;
    
    
    if(usersearch.admin === 1){
      req.session.admin= usersearch.admin;
    }
    res.redirect('/');

  } else {
    console.log ("dataInClear != hash, KO");
    otherErrorss.push({msg :'Wrong email or password'})
    req.session.connected=false;
    
    res.render('users/login',{errors:otherErrorss})
  }
});

router.get('/inscription', function (req, res, next) {
  res.render('users/inscription');
});

router.post('/add', function (req, res, next) {
  
 let nom = req.body.nom;
 let prenom = req.body.prenom;
 let e_mail = req.body.e_mail;
 let password = req.body.password;
 otherErrors = [];
 let string1 =(prenom + "."+ nom+"@student.vinci.be").toLowerCase();
 let string2 =(prenom + "."+ nom +"@vinci.be").toLowerCase()
 let string3 = javascripts.VerifyRegexEmail(e_mail);

 if (user.verify(e_mail)) {
    console.log("user email already exist in DB");
    otherErrors.push({ msg: "This email is already being used in another account" });
    
    res.render('users/inscription', { errors: otherErrors });
  } else
  if(e_mail!=string1 && e_mail!=string2 && string3!=true){
    otherErrors.push({msg:"Email Not Valid"})
    console.log("email not valid");
    
    res.render('users/inscription', { errors: otherErrors});
  }
  else{

 req.session.connected = true;
 const saltRounds = 10;
 const encryptedData = bcrypt.hashSync(password, saltRounds);

 let form = {nom:nom,prenom:prenom,e_mail:e_mail,password:encryptedData};

 user.add(form);

  res.redirect('/');
}
});

router.get('/logout', (req, res, next) => {

  console.log("LOGOUT");
  req.session.destroy();

  res.redirect('/');
  
});

module.exports = router;


