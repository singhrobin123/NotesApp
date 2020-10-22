const router = require("express").Router();

const {registerUserController,loginUserController} = require("./users.controller");

 router.route("/register").post(registerUserController);
 router.route("/auth").post(loginUserController);

module.exports = router;