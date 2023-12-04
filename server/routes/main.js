import express from "express";
import {
  createAgency,
  getAllAgency,
  getSingleAgency,
  deleteAgency,
} from "../controllers/agency.js";

const router = express.Router();

router.post("/agency", createAgency);
router.get("/agency", getAllAgency);
// router.get("/agency/:agencyId", getSingleAgency);
// router.delete("/agency/:agencyId", deleteAgency);

export default router;
