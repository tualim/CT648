const express = require("express");
const { body } = require("express-validator/check");
const isAuthQr = require("../middleware/is-auth-qr");
const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");
const lineNotify = require("../middleware/line-notify");

const router = express.Router();

// GET /feed/posts
router.get("/posts", isAuth, feedController.getPosts);

router.get("/posts", isAuthQr, isAuth, feedController.getPosts); //lineNotify
// POST /feed/post
router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

router.get("/post/:postId", isAuth, feedController.getPost);

router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router;
