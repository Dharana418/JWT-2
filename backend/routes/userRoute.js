import { Router } from "express";
import { createUser,getRegisteredUsers,getUserByUsername} from "../controllers/usercontroller.js";

const router = Router();

router.post("/signup", createUser);
router.get("/signup", getRegisteredUsers);
router.post("/login", getUserByUsername);

export default router;
