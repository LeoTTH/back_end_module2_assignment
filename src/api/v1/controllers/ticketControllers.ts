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

// Controller function to create a new ticket
export const createTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        if (!req.body.title) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Missing required field: title"
            });
            return;
        }

        if (!req.body.description) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Missing required field: description"
            });
            return;
        }

        const validPriorities: Ticket["priority"][] = [
            "critical",
            "high",
            "medium",
            "low"
        ];

        if (
            !req.body.priority ||
            !validPriorities.includes(req.body.priority)
        ) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Invalid priority. Must be one of: critical, high, medium, low"
            });
            return;
        }

        const { title, description, priority } = req.body;

        const newTicket: Ticket =
            await ticketService.createTicket({
                title,
                description,
                priority
            });

        res.status(HTTP_STATUS.CREATED).json({
            message: "Ticket created successfully",
            data: newTicket
        });

    } catch (error) {
        next(error);
    }
};

// Controller function to update a ticket by ID
export const updateTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: number = Number(req.params.id);

        const validPriorities: Ticket["priority"][] = [
            "critical",
            "high",
            "medium",
            "low"
        ];

        const validStatuses: Ticket["status"][] = [
            "open",
            "in-progress",
            "resolved"
        ];

        // Validate priority if provided
        if (
            req.body.priority &&
            !validPriorities.includes(req.body.priority)
        ) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:
                    "Invalid priority. Must be one of: critical, high, medium, low"
            });
            return;
        }

        // Validate status if provided
        if (
            req.body.status &&
            !validStatuses.includes(req.body.status)
        ) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:
                    "Invalid status. Must be one of: open, in-progress, resolved"
            });
            return;
        }

        // Extract allowed update fields
        const {
            title,
            description,
            priority,
            status
        } = req.body;

        // Only include fields that were actually provided
        const updateData: Partial<
            Pick<
                Ticket,
                "title" | "description" | "priority" | "status"
            >
        > = {
            ...(title !== undefined ? { title } : {}),
            ...(description !== undefined ? { description } : {}),
            ...(priority !== undefined ? { priority } : {}),
            ...(status !== undefined ? { status } : {})
        };

        const updatedTicket: Ticket | undefined =
            await ticketService.updateTicket(
                id,
                updateData
            );

        if (!updatedTicket) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Ticket not found"
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Ticket updated successfully",
            data: updatedTicket
        });

    } catch (error) {
        next(error);
    }
};

// Controller function to delete a ticket by ID
export const deleteTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: number = Number(req.params.id);

        const deleted: boolean =
            await ticketService.deleteTicket(id);

        if (!deleted) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Ticket not found"
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Ticket deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};

// Controller function to get ticket urgency by ID
export const getTicketUrgency = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: number = Number(req.params.id);

        const urgency = await ticketService.calculateTicketUrgency(id);

        if (!urgency) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Ticket not found"
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Ticket urgency calculated successfully",
            data: urgency
        });

    } catch (error) {
        next(error);
    }
};