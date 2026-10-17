import express, { Router } from "express";
import * as ticketController from "../controllers/ticketControllers";

const router: Router = express.Router();

router.get("/", ticketController.getAllTickets);
router.get("/:id", ticketController.getTicketById);
router.post("/", ticketController.createTicket);
router.put("/:id", ticketController.updateTicket);

export default router;