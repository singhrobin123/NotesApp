const router = require('express').Router();
const usersRouter = require("./modules/users/users.route");
const notesRouter = require("./modules/notes/notes.route");

router.use("/user",usersRouter);
router.use("/sites",notesRouter);

module.exports = router;