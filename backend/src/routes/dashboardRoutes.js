import express from "express";
import { dashboardOverview } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/overview", dashboardOverview);

export default router;