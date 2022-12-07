const express = require('express');
const router = express.Router();
const questionP = require('../models/Question.js');
const answers = require('../models/Answer.js');
const members = require('../models/User.js');

router.get('/', function (req, res, next) {
  console.log(req.session);

  let owner = req.session.id_member;
  console.log("MEMBER PAGE");
  console.log(owner);
  const tableQuestionSolved = questionP.listQuestionsSolved(owner);
  const InfoMembers = members.getInfoMembers(owner);
  const QuestionsMembers = questionP.listNumberQuestionsByMembers(owner);
  const tableQuestionNotSolved = questionP.listQuestionsNotSolved(owner);
  const admin = req.session.admin;
  const connected = req.session.connected;
  const AnswerMembers = answers.listNumberAnswerByMembers(owner);


  console.log('Questions Solved : ')
  console.log(tableQuestionSolved);
  console.log('Questions Not Solved : ')
  console.log(tableQuestionNotSolved);

  res.render('members/members', { tableQuestionSolved, QuestionsMembers, tableQuestionNotSolved, InfoMembers, AnswerMembers, connected, admin })
});

module.exports = router;