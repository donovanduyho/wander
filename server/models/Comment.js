const database = require('../database');

async function findCommentByCid(cid) {
    return database.query("SELECT * FROM Comment WHERE cid = ?", [cid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function addComment(comment) {
    const {
        event_id,
        person_id,
        event_comment,
        rating
    } = comment
    database.query("INSERT INTO Comment (event_id, person_id, event_comment, rating, posting_time) VALUES (?,?,?,?,?) VALUES (?,?,?,?,NOW())", [event_id, person_id, event_comment, rating])
    .then(([data]) => data)
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function deleteComment(comment) {
    const {
        eid,
        pid
    } = comment;

    database.query("DELETE FROM Comment WHERE eid = ? AND pid = ?", [eid, pid])
    .then(([result]) => result)
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function listComments(eid) {
    database.query("SELECT * FROM Comment WHERE eid = ?")
    .then(([data]) => data.map(row => ({...row})))
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function updateComment(comment) {
    const {cid, pid, text, rating} = comment;

    return database.query("UPDATE Comment SET event_comment = ?")
}


module.exports = {
    findCommentByCid,
    addComment,
    deleteComment,
    listComments
}