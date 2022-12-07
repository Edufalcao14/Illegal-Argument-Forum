const express = require('express');
const router = express.Router();
const question = require('../models/Question.js');
const answer = require('../models/Answer.js');
const category = require('../models/Category.js');


router.get('/', function (req, res, next) {

  const questionsTable = question.list20Questions();
  const categoriesTable = question.listCategories();
  
  const connected = req.session.connected;
  const admin = req.session.admin;
  const listNumberQuestions = questionsTable.length;
  const id_question1 = req.query.id_question
  const listNumberAnswer = answer.listNumberAnswers(id_question1);


  res.render('index', {questionsTable, categoriesTable, connected, admin , listNumberQuestions, listNumberAnswer});
});



router.get('/createQuestion', function (req, res, next) {
  res.redirect('/questions');
});


module.exports = router;
