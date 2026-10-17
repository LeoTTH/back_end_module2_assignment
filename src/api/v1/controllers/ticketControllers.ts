import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import * as ticketService from "../services/ticketService";
import type { Ticket } from "../../../data/tickets";

// Controller function to get all tickets
export const getAllTickets = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const tickets: Ticket[] = await ticketService.getAllTickets();

        res.status(HTTP_STATUS.OK).json({
            message: "Tickets retrieved successfully",
            data: tickets
        });
    } catch (error) {
        next(error);
    }
};

// Controller function to get a ticket by ID
export const getTicketById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: number = Number(req.params.id);

        const ticket: Ticket | undefined =
            await ticketService.getTicketById(id);

        if (!ticket) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Ticket not found"
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Ticket retrieved successfully",
            data: ticket
        });
    } catch (error) {
        next(error);
    }
};