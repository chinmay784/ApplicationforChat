const express = require("express");
const { register, login, getAllUsers } = require("../controllers/RegiSter");
const router = express.Router();


router.post("/register",register);
router.post("/login",login);
router.post("/getallUsers",getAllUsers);


module.exports = router