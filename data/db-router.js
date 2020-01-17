const router = require("express").Router();

const Posts = require("../data/db.js");

// GET returns array of posts -- tested and works

router.get("/", (req, res) => {
  Posts.find()
    .then(allPosts => {
      res.status(200).json(allPosts);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// GET by id -- come back and test (returning an empty array instead of error message)

router.get("/:id", (req, res) => {
  const postId = req.params.id;

  Posts.findById(postId)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

// GET by comments -- come back and test (returning an empty array instead of error message)

router.get("/:id/comments", (req, res) => {
  const postId = req.params.id;
  //   const post = Posts.find(a => a.id == req.params.id);

  Posts.findPostComments(postId)
    .then(comments => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(comments);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

// POST creates a post -- tested and works

router.post("/", (req, res) => {
  const { title, contents } = req.body;

  Posts.insert(req.body)
    .then(post => {
      if (!title || !contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        res.status(201).json(post);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

// POST creates a comment for the post, with post id and using req.body --IT'S WORKING, IT'S WORKING!

router.post("/:id/comments", (req, res) => {
  const { text, post_id } = req.body;

  Posts.insertComment(req.body)
    .then(newComment => {
      if (!post_id) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (!text) {
        return res
          .status(400)
          .json({ errorMessage: "Please provide text for the comment." });
      } else {
        res.status(201).json(newComment);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});

// DELETE removes a post, returns deleted post object --tested and working

router.delete("/:id", (req, res) => {
  const deleteId = req.params.id;

  Posts.findById(deleteId)

    .then(deleted => {
      if (deleted.length === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        Posts.remove(deleteId).then(res.status(200).json(deleted));
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed"
      });
    });
});
// PUT updates a post with id using req.body --the updating works, returns the updated post

router.put("/:id", (req, res) => {
  const updateId = req.params.id;
  const { title, contents } = req.body;

  Posts.update(updateId, req.body)
    .then(updated => {
      if (!title || !contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else if (!updateId) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        console.log(updated);
        res.status(200).json(updated);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
  Posts.findById(updateId)
    .then(res.json(req.body))
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

module.exports = router;
