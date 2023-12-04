import express from "express";

import { createGreetings, getAllGreetings } from "../controllers/greetings.js";

const router = express.Router();

router.post("/greetings", createGreetings);
router.get("/greetings", getAllGreetings);

export default router;
