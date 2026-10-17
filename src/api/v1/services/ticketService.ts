import { Ticket, tickets } from "../../../data/tickets";

// Service function to get all tickets
export const getAllTickets = async (): Promise<Ticket[]> => {
    return structuredClone(tickets);
};

// Service function to get a ticket by ID
export const getTicketById = async (id: number): Promise<Ticket | undefined> => {
    const ticket: Ticket | undefined = tickets.find(
        (ticket) => ticket.id === id
    );

    return ticket ? structuredClone(ticket) : undefined;
};