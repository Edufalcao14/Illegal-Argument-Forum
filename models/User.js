const db = require('./db_conf'); 

module.exports.add = (data) => {
    const stmt = db.prepare('INSERT INTO members(nom, prenom, e_mail , password) VALUES (?, ?, ? , ?)');
    const info = stmt.run(data.nom, data.prenom, data.e_mail,data.password);
    console.log("users model save insert" + info.changes);
}
module.exports.search = (data) => {
    const stmt = db.prepare('SELECT * FROM members WHERE e_mail = ?');
    return stmt.get(data);
}
module.exports.verify = (e_mail) => {
    console.log(e_mail);
    return db.prepare('SELECT * FROM members WHERE e_mail = ?').get(e_mail);
}
module.exports.verifyAdmin = (data) => {
    console.log(e_mail);
    return db.prepare('SELECT * FROM members WHERE admin = true AND id_member = ?').get(data);

}
module.exports.getInfoMembers = (data) => {
    const stmt = db.prepare('SELECT * FROM members WHERE id_member=?');
    return stmt.get(data);
}


