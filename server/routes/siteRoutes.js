import express from "express";
import { getAllSites } from "../controllers/siteController.js";

const router = express.Router();

router.get("/", getAllSites);

export default router;