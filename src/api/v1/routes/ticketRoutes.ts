import express, { Router } from "express";
import * as ticketController from "../controllers/ticketControllers";

const router: Router = express.Router();

router.get("/", ticketController.getAllTickets);
router.get("/:id", ticketController.getTicketById);

export default router;