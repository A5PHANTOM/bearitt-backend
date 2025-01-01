import { Router } from "express";

import {
    createUser,
    userLogin,
    getAllUsers
} from "../controllers/userController.js"

const router = Router();

router.post("/", createUser);
router.post("/login", userLogin);
router.get("/all", getAllUsers);

export default router;