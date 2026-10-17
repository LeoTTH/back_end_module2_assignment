import { Ticket, tickets } from "../../../data/tickets";

export const getAllTickets = async (): Promise<Ticket[]> => {
    return structuredClone(tickets);
};