const express = require('express');
const router = express.Router();

const {
    findCommentByCid,
    addComment,
    deleteComment,
    listComments
} = require('../models/Comment')

router.get('/:eid/comments', (req, res) => {
    const {eid} = req.param
    listComments(eid).then((data) => res.status(200).json({data}))
    .catch((err) => res.status(400).json({ message: "Something went wrong fetching comments"}))
})

router.post('/:eid/post'), (req, res) => {
    const {eid} = req.param;
    const {pid} = req.user;
    const {
        event_comment,
        rating
    } = req.body

    const newComment = {
        eid,
        pid,
        event_comment,
        rating
    }

    addComment(newComment).then(() => res.status(200).json({message: "Successfully added comment"}))
    .catch(() => res.status(400).json({ message: "Error adding comment"}));

}

router.delete('/:eid/delete', (req, res) => {
    const {eid} = req.param;
    const {pid} = req.user;
    const comment = {
        eid,
        pid
    }
    deleteComment(comment).then(() => res.status(200).json({ message: "comment successfully deleted"}))
    .catch(()  => res.status(400).json({ message: "Error deleting comment"}));
})