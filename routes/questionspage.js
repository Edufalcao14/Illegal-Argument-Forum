const express = require('express');
const router = express.Router();
const questionP = require('../models/Question.js');
const answer = require('../models/Answer.js');
const categories = require('../models/Category.js');
const users = require('../models/User.js');
const javascripts = require('../services/userServices');



router.get('/', (req, res, next) => {
  
  const connected = req.session.connected;
  const admin = req.session.admin
  let id_question = req.query.id;
  const showQuestion = questionP.listQuestionPage(id_question);
  const showReponses = answer.listAnswers(id_question);

  let id_category = questionP.listQuestionPage(id_question).id_categorie;
  const showCategorie = categories.showCategorieQuestion(id_category);
  let membersofthequestion = questionP.getidmembers(id_question);

  let member = req.session.id_member;
  let ownerQuestion;
  let showRightAnswerAbove;
  let unsolvedback = questionP.getRightAnswer(id_question);
  let checkifSolved = questionP.checkifSolved(id_question);

  let questionSolved;
  if (checkifSolved == 1) {
    questionSolved = true;
  } else {
    questionSolved = false;
  }

  if (member == membersofthequestion) {

    ownerQuestion = true;

  }

  if (questionSolved === true) {

    showRightAnswerAbove = questionP.getRightAnswer(id_question);

   

    res.render('questions/questionpage', { showQuestion, showReponses, showCategorie, connected, admin, ownerQuestion, showRightAnswerAbove, questionSolved  });

  } else {}
  
  res.render('questions/questionpage', { showQuestion, showReponses, showCategorie, connected, admin , questionSolved, ownerQuestion});

});

// Button report answer 
router.post('/report', (req, res, next) => {

  let id_question = req.body.id;

  answer.report(req.body.id_reponse);
  res.redirect('/questionspage?id=' + id_question);
});


// Button Right Answer
router.post('/rightAnswer', (req, res, next) => {


  let id_question = req.body.id;
  answer.rightAnswer(req.body.id_reponse);
  questionP.solvedQuestion(req.body.id);




  res.redirect('/questionspage?id=' + id_question);
});


// add an answer below the question
router.post('/add', (req, res, next) => {
  let description = req.body.description;
  let id_member = req.session.id_member;
  le = true;
  let id_question = req.body.id_question;


  if (description.length >= 5) {
    
    const formAnswer = { description: description, id_member: id_member, id_question: id_question };
    min1Char=false;
    console.log('Form Answer : ' + JSON.stringify(formAnswer));
    answer.addAnswer(formAnswer);
    res.redirect('/questionspage?id=' + id_question);
  }
  else {
    min1Char=false
    res.redirect('/questionspage?id=' + id_question);
  }


});

// Button report the question 
router.post('/reportQuestion', (req, res, next) => {

  let id_question = req.body.id;

  questionP.reportQuestion(id_question);

  res.redirect('/questionspage?id=' + id_question);
});

module.exports = router;
