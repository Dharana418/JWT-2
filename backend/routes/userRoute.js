const {Router}=require('express');
const {createuser}=require("../controllers/usercontroller.js");
const router=Router();
router.post('/signup',createuser);
