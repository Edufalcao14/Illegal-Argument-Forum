const db = require('./db_conf');

module.exports.list = () => db.prepare("SELECT nom_categorie FROM categories").all();

module.exports.showCategorieQuestion = (data) => {
    const stmt = db.prepare("SELECT * FROM categories WHERE id_categorie = ?")
    return stmt.get(data);
}
module.exports.SearchByCategory = (data) => {
    const stmt = db.prepare("SELECT * FROM questions WHERE id_categorie = ?")
    return stmt.all(data);
}

