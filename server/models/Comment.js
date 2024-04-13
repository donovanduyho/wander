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
        eid,
        pid,
        event_comment,
        rating
    } = comment
    return database.query("INSERT INTO Comment (event_id, person_id, event_comment, rating, post_time) VALUES (?,?,?,?,NOW())", [eid, pid, event_comment, rating])
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

    return database.query("DELETE FROM Comment WHERE event_id = ? AND pid = ?", [eid, pid])
    .then(([result]) => result)
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function listComments(event_id) {
    return database.query("SELECT * FROM Comment WHERE event_id = ?", [event_id])
    .then(([data]) => data.map(row => row))
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function updateComment(comment) {
    const {cid, pid, event_comment, rating} = comment;
    return database.query("UPDATE Comment SET event_comment = ?, rating = ? WHERE cid = ? AND person_id = ?", [event_comment, rating, cid, pid])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}


module.exports = {
    findCommentByCid,
    addComment,
    deleteComment,
    listComments,
    updateComment
}