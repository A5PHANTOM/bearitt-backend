import { Router } from "express";

import {
    test
} from "../controllers/testController.js"

const router = Router();

router.get("/", test);

export default router;