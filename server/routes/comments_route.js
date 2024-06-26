const express = require('express');
const router = express.Router();

const {
    findCommentByCid,
    addComment,
    deleteComment,
    listComments,
    updateComment
} = require('../models/Comment')


router.post('/:eid/post', (req, res) => {
    const {eid} = req.params;
    const {
        pid,
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

})

router.get("/:eid/list", (req, res) => {
    const {eid} = req.params
    listComments(eid).then((data) => res.status(200).json( data ))
    .catch(() => res.status(400).json({ message: "Error listing comments"}))
})

router.delete('/delete/:cid', (req, res) => {
    const {
        cid
    } = req.params;
    deleteComment(cid).then(() => res.status(200).json({ message: "comment successfully deleted"}))
    .catch(()  => res.status(400).json({ message: "Error deleting comment"}));
})

router.put('/:cid/edit', (req, res) => {
    const {cid} = req.params;
    const {pid, event_comment, rating} = req.body;
    const comment = {
        cid,
        pid,
        event_comment,
        rating
    }
    updateComment(comment).then(() => res.status(200).json({ message: "Comment successfully updated"}))
    .catch(() => res.status(400).json({ message: "Error editing comment"})); 
})

module.exports = router;