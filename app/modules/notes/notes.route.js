const router = require("express").Router();

const {getUserNotesController,saveUserNotesController} = require("./notes.controller");

 router.route("/list/:userId").get(getUserNotesController);
 router.route("/:userId").post(saveUserNotesController);

module.exports = router;