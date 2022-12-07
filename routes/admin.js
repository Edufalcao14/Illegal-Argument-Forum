const express = require('express');
const router = express.Router();
const question = require('../models/Question.js');
const answers = require('../models/Answer.js');
const members = require('../models/User.js');

router.get('/',function (req, res, next) {

    let tableQuestionReported = question.listQuestionsReported();
    let TableAnswersReported = answers.listAnswersReported();
    console.log(tableQuestionReported)
    console.log(TableAnswersReported)
  
    const connected = req.session.connected;
    const admin = req.session.admin;
    const id_Admin = req.session.id_member
    const infoAdmin = members.getInfoMembers(id_Admin);
  
      res.render('members/adminpage',{tableQuestionReported,TableAnswersReported,connected, admin , infoAdmin})
    });

    router.post('/removeQuestion',function (req, res, next) {
        
        let id_question = req.body.id_question;      

        question.deleteAnswers(id_question);
        question.delete(id_question);

        res.redirect('/admin')
    });

    router.post('/allowQuestion',function (req, res, next) {
        
        let id_question = req.body.id_question;

        question.allow(id_question);

        res.redirect('/admin')
    });

    router.post('/removeAnswer',function (req, res, next) {
        
        let id_reponse = req.body.id_reponse;

        answers.delete(id_reponse);
        console.log('id_question =' +JSON.stringify(id_reponse));

        res.redirect('/admin') 
    });

    router.post('/allowAnswer',function (req, res, next) {
        let id_reponse = req.body.id_reponse;

        console.log('id_question =' +JSON.stringify(id_reponse));

        answers.allow(id_reponse);

        res.redirect('/admin')
    });
    
module.exports = router;