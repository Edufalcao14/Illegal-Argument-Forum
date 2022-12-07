
const db = require('../models/db_conf');

module.exports.list20Questions = () => {
  const stmt = db.prepare("SELECT A.*,B.nom_categorie AS Categorie FROM questions A , categories B where A.id_categorie =B.id_categorie GROUP BY A.id_question ORDER BY A.id_question ")
  return stmt.all();
}
module.exports.listUnaswered = () => {
  const stmt = db.prepare("SELECT * FROM questions WHERE solved=0 ORDER BY id_question DESC LIMIT 20")
  return stmt.all();
}
module.exports.listOldest = () => {
  const stmt = db.prepare("SELECT * FROM questions  ORDER BY id_question ASC LIMIT 50")
  return stmt.all();
}
module.exports.listNewest = () => {
  const stmt = db.prepare("SELECT * FROM questions ORDER BY id_question DESC LIMIT 50")
  return stmt.all();
}

module.exports.listNumberAnswers = (data) => {
  const stmt = db.prepare("SELECT COUNT(id_question) AS Questions FROM questions")
  const info = stmt.get(data);
  console.log("info : " + JSON.stringify(info));
  return Object.values(info);
}
module.exports.listNumberAnswersUnaswered = (data) => {
  const stmt = db.prepare("SELECT COUNT(id_question) AS Questions FROM questions WHERE solved=0")
  const info = stmt.get(data);
  console.log("info : " + JSON.stringify(info));
  return Object.values(info);
}


module.exports.listQuestions = () => db.prepare("SELECT * FROM questions").all();

module.exports.listQuestionPage = (data) => {
  const stmt = db.prepare("SELECT * FROM questions WHERE id_question = ?")
  return stmt.get(data);
}

module.exports.listCategories = () => db.prepare("SELECT * FROM categories").all();


module.exports.searchSolved = (titre) => {
  return db.prepare('SELECT titre,solved FROM question WHERE titre LIKE ?').all('%' + titre + '%');
};


module.exports.addQuestion = (data) => {
  const stmt = db.prepare('INSERT INTO questions(titre,description,id_categorie,id_member) VALUES(?,?,?,?) RETURNING id_question');
  const info = stmt.run(data.titre, data.description, data.categorie, data.id_member);
  console.log("Question model save insert " + JSON.stringify(info));
  return info.lastInsertRowid;
}
module.exports.listQuestionsSolved = (data) => {
  const stmt = db.prepare("SELECT * FROM questions WHERE solved = 1 AND id_member = ?");
  return stmt.all(data);

}
module.exports.listQuestionsNotSolved = (data) => {
  const stmt = db.prepare("SELECT * FROM questions WHERE solved = 0 AND id_member = ?");
  console.log("SOLVED")

  return stmt.all(data);

}

module.exports.listQuestionsReported = () => db.prepare("SELECT * FROM questions WHERE reported_question = true").all();

module.exports.SearchQuestion = (titre) => {
  return db.prepare('SELECT * FROM questions WHERE titre LIKE ?').all('%' + titre + '%');
}

module.exports.delete = (data) => {
  const info = db.prepare('DELETE FROM questions WHERE id_question = ?').run(data);
  console.log("Answer model delete" + info.changes);
};

module.exports.deleteAnswers = (data) => {
  const info = db.prepare('DELETE FROM reponses WHERE id_question= ?').run(data);
  console.log("Answer model delete" + info.changes);
};

module.exports.allow = (data) => {
  const stmt = db.prepare('UPDATE questions SET reported_question = 0 WHERE id_question = ?');
  const info = stmt.run(data);
  console.log("Answer model save update" + info.changes);
}
module.exports.solvedQuestion = (data) => {
  const stmt = db.prepare('UPDATE questions SET solved = 1 WHERE id_question = ?');
  const info = stmt.run(data);
  console.log("Answer model save update" + info.changes);
}
module.exports.reportQuestion = (data) => {
  const stmt = db.prepare('UPDATE questions SET reported_question = 1 WHERE id_question = ?')
  const info = stmt.run(data);
  console.log("Question model save insert " + JSON.stringify(info));
};

module.exports.getidmembers = (data) => {
  const stmt = db.prepare('SELECT id_member FROM questions WHERE id_question = ? ')
  const info = stmt.get(data);
  console.log("info : " + JSON.stringify(info));
  return Object.values(info);
}

module.exports.getRightAnswer = (data) => {
  const stmt = db.prepare('SELECT * FROM reponses WHERE bonne_reponse = 1 AND id_question = ? ')
  const info = stmt.get(data);
  console.log("Question model save insert " + JSON.stringify(info));
  return info;
}
module.exports.listNumberQuestionsByMembers = (data) => {
  const stmt = db.prepare("SELECT COUNT(id_question) AS Questions FROM questions where id_member = ?")
  const info = stmt.get(data);
  console.log("info : " + JSON.stringify(info));
  return Object.values(info);
}
module.exports.checkifSolved = (data) => {
  const stmt = db.prepare('SELECT solved FROM questions WHERE id_question = ?')
  const info = stmt.get(data);
  console.log("info : " + JSON.stringify(info));
  return Object.values(info);
};