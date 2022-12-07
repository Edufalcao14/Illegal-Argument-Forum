const db = require('./db_conf');

module.exports.listAnswers =(data) =>{
    const stmt = db.prepare("SELECT * FROM reponses WHERE bonne_reponse=0 AND id_question = ?")
    return stmt.all(data);
   
   }
   module.exports.listAllAnswers =(data) =>{
    const stmt = db.prepare("SELECT * FROM reponses ORDER By id_reponse ")
    return stmt.all(data);
   
   }
   
   
   module.exports.addAnswer = (data ) =>{
    const stmt = db.prepare('INSERT INTO reponses(description,id_question,id_member) VALUES(?,?,?)');
    const info = stmt.run(data.description,data.id_question,data.id_member);
    console.log("Question model save insert " + info.changes);
   }

   module.exports.listAnswersReported = () => db.prepare("SELECT * FROM reponses WHERE reported = true").all();

   module.exports.delete = (data) => {
    const info = db.prepare('DELETE FROM reponses WHERE id_reponse = ?').run(data);
    console.log("Answer model delete" + info.changes);
  };

   module.exports.allow = (data) => {
    const stmt = db.prepare('UPDATE reponses SET reported = 0 WHERE id_reponse = ?');
    const info = stmt.run(data);
    console.log("Answer model save update" + info.changes);
  }
  module.exports.report = (data) => {
   
    const stmt = db.prepare('UPDATE reponses SET reported = 1 WHERE id_reponse = ?')
    const info = stmt.run(data);
    console.log("reported answer to TRUE " + info.changes);
  };
  module.exports.rightAnswer = (data) => {
    const stmt = db.prepare('UPDATE reponses SET bonne_reponse = 1 WHERE id_reponse = ?');
    const info = stmt.run(data);
    console.log("Answer model save update" + info.changes);
  }
  
  module.exports.listNumberAnswers =(data) =>{
    const stmt = db.prepare("SELECT COUNT(id_reponse) FROM reponses WHERE id_question = ? ")
    const info = stmt.all(data);
    return Object.values(info);
   
   }
   module.exports.listNumberAnswerByMembers = (data) => {
    const stmt = db.prepare("SELECT COUNT(id_question) AS Questions FROM questions where id_member = ? AND solved = 1")
    const info = stmt.get(data);
    console.log("info : " + JSON.stringify(info));
    return Object.values(info);
  }
  