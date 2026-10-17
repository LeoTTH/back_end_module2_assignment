import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import * as ticketService from "../services/ticketService";
import type { Ticket } from "../../../data/tickets";

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