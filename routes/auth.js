const express=require("express");
const router=express.Router();

const {login, refreshTokenController, logout}=require("../controllers/authController");

router.post("/login",login);
router.post("/refresh",refreshTokenController);
router.post("/logout",logout);

module.exports=router;