import express, { Router } from "express";
import * as ticketController from "../controllers/ticketControllers";

const router: Router = express.Router();

router.get("/", ticketController.getAllTickets);
router.get("/:id", ticketController.getTicketById);
router.post("/", ticketController.createTicket);
router.put("/:id", ticketController.updateTicket);
router.delete("/:id", ticketController.deleteTicket);
router.get("/:id/urgency", ticketController.getTicketUrgency);

export default router;