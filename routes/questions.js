const express = require('express');
const router = express.Router();
const question = require('../models/Question.js');
const category = require('../models/Category.js');



router.get('/createQuestion', function (req, res, next) {
    const connected = req.session.connected;
    const admin = req.session.admin;
    const categoriesTable = question.listCategories();

    res.render('questions/createQuestion', { categoriesTable, connected, admin });
});

router.post('/createQuestion/add', function (req, res, next) {


    let formQuestion = {
        titre: req.body.titre,
        categorie: req.body.categorie,
        description: req.body.description,
        id_member: req.session.id_member
    };

    const connected = req.session.connected;
    const titre = req.body.titre;
    const description = req.body.description;
    let min1Char = true;
  
    const categoriesTable = question.listCategories();
    

    if (titre.length >=3 && description.length >= 5) {
    min1Char = false;  
    const id_question = question.addQuestion(formQuestion);
    console.log('la question add :' + + JSON.stringify(formQuestion));
    res.redirect('/questionspage?id='+ id_question);
} else

    res.render('questions/createQuestion', {min1Char, categoriesTable , connected});
});

router.get('/searchQuestion', function (req, res, next) {

    const admin = req.session.connected;
    const connected = req.session.connected;
    const categoriesTable = category.list();
    const titre = req.query.titre;

    let min3Char = true;
    console.log("GET SEARCH  QUESTIONS");
    

    if (titre.length >= 3) {
        min3Char = false;
        questionsTable = question.SearchQuestion(titre);
        const listNumberQuestions = questionsTable.length;
        res.render('index', { questionsTable, categoriesTable , admin, connected,min3Char, listNumberQuestions })
    } else 
        questionsTable = null;
        const listNumberQuestions = 0;
    res.render('index', { questionsTable, categoriesTable , admin, connected, min3Char , listNumberQuestions})
});
router.get('/searchByCategory', function (req, res, next) {

    const admin = req.session.connected;
    const connected = req.session.connected;
    const categoriesTable = question.listCategories();

    const id_category= req.query.categoriesL;
    
    const questionsTable = category.SearchByCategory(id_category);
    const listNumberQuestions = questionsTable.length;
    
    res.render('index', { questionsTable, admin, connected,categoriesTable, listNumberQuestions})
});
router.get('/searchUnaswered', function (req, res, next) {

    const categoriesTable = question.listCategories();

    const admin = req.session.connected;
    const connected = req.session.connected;
    
    const questionsTable = question.listUnaswered;
    const listNumberQuestions = question.listNumberAnswersUnaswered;

    res.render('index', { questionsTable, admin, connected,listNumberQuestions , categoriesTable  })
});
router.get('/searcholdest', function (req, res, next) {

    const categoriesTable = question.listCategories();

    const admin = req.session.connected;
    const connected = req.session.connected;
    
    const questionsTable = question.listOldest;
    const listNumberQuestions = 50;

    res.render('index', { questionsTable, admin, connected, listNumberQuestions, categoriesTable})
});
router.get('/searchNewest', function (req, res, next) {
    const categoriesTable = question.listCategories();
    const admin = req.session.connected;
    const connected = req.session.connected;
    
    const questionsTable = question.listNewest;

    const listNumberQuestions = 50;
    
    res.render('index', { questionsTable, admin, connected, listNumberQuestions,categoriesTable , listNumberQuestions })
});


module.exports = router;
