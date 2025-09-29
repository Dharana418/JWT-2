import { Router } from "express";
import { createUser,getRegisteredUsers } from "../controllers/usercontroller.js";

const router = Router();

router.post("/signup", createUser);
router.get("/signup", getRegisteredUsers);

export default router;
