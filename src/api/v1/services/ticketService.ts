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

// Service function to create a new ticket
export const createTicket = async (
    ticketData: {
        title: string;
        description: string;
        priority: Ticket["priority"];
    }
): Promise<Ticket> => {

    const newId: number =
        tickets.length > 0
            ? Math.max(...tickets.map((ticket: Ticket) => ticket.id)) + 1
            : 1;

    const newTicket: Ticket = {
        id: newId,
        title: ticketData.title,
        description: ticketData.description,
        priority: ticketData.priority,
        status: "open",
        createdAt: new Date()
    };

    tickets.push(newTicket);

    return structuredClone(newTicket);
};

// Service function to update a ticket by ID
export const updateTicket = async (
    id: number,
    updateData: Partial<Pick<Ticket, "title" | "description" | "priority" | "status">>
): Promise<Ticket | undefined> => {

    const index: number = tickets.findIndex(
        (ticket: Ticket) => ticket.id === id
    );

    if (index === -1) {
        return undefined;
    }

    tickets[index] = {
        ...tickets[index],
        ...updateData
    };

    return structuredClone(tickets[index]);
};